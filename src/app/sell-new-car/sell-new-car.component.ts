import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarUploadService } from '../services/car-upload.service';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filter, tap, take } from 'rxjs/operators';
import { CarDetails } from '../models/car';
import { ErrorsService } from '../services/errors.service';

@Component({
    selector: 'app-sell-new-car',
    templateUrl: './sell-new-car.component.html',
    styleUrls: ['./sell-new-car.component.css']
})

export class SellNewCarComponent implements OnInit, OnDestroy {

    imageError: string[] = [null, null, null];
    isImageSaved: boolean[] = [false, false, false];
    cardImageBase64: string[] = [null, null, null];
    fileToUpload = [null, null, null];
    imageUrl: string[] = [null, null, null];

    imagePreUpload:boolean[] = [null, null, null]

    stepDetails:boolean = true;
    stepChoose:boolean = false;
    stepUploading:boolean = false;
    stepUploaded:boolean = false;
    uploading:boolean = false;
    percentDone:number[] = [0,0,0];
    
    // Size Filter Bytes
    max_size = 1048576; // 1MB
    allowed_types = ['image/png', 'image/jpeg'];
    height = 300;
    width = 300;

    formDetails: FormGroup;
    formImages: FormGroup;

    submitted:boolean;

    carDetails:CarDetails = {'brand':null, 'model':null, 'type':null, 'price':null, 'userId':null};

    subscriptions = new Subscription

    constructor(private formBuilder: FormBuilder, 
        private carUploadService: CarUploadService, 
        private authenticationService:AuthenticationService,
        private errorsService:ErrorsService) { }

    ngOnInit() {

        this.formDetails = this.formBuilder.group({
            brand: ['', [Validators.required, Validators.minLength(2)]],
            model: ['', [Validators.required, Validators.minLength(1)]],
            type: ['', [Validators.required, Validators.minLength(3)]],
            price: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[0-9]+$')]]
        });

        this.formImages = this.formBuilder.group({
            image1: ['', [Validators.required, Validators.minLength(1)]],
            image2: ['', [Validators.required, Validators.minLength(1)]],
            image3: ['', [Validators.required, Validators.minLength(1)]],
        });

    }

    fileChangeEvent(fileInput: any, formN:number) {
        
        this.imageError[formN] = null;
        this.cardImageBase64[formN] = null;
        this.isImageSaved[formN] = false;

        this.fileToUpload[formN] = fileInput.target.files[0];
        
        if (fileInput) {

            if (fileInput.target.files[0].size > this.max_size) {

                this.imageError[formN] = 'Maximum size allowed is 1 MB';

                return false;
            }

            if (!_.includes(this.allowed_types, fileInput.target.files[0].type)) {
                this.imageError[formN] = 'Only Images are allowed ( JPG or PNG )';

                return false;
            }
        
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    if (img_height < this.height || img_width < this.width) {

                        this.imageError[formN] = 'Dimentions allowed ' + this.height + '*' + this.width + 'px';

                        return false;

                    } else {
                    
                        //this.image1PreUpload.next(true);
                        this.cardImageBase64[formN] = e.target.result;
                        this.imageUrl[formN] = fileInput.target.files[0].name;

                        switch (formN) {
                            case 0:
                            this.imagePreUpload[0] = true;
                            break;
                            
                            case 1:
                            this.imagePreUpload[1] = true;
                            break;
                            
                            case 2:
                            this.imagePreUpload[2] = true;
                            break;
                        }
                        
                        this.isImageSaved[formN] = true;
                    

                    }

                };
            };

        reader.readAsDataURL(fileInput.target.files[0]);
        
        }

    }

    get fDetails() { return this.formDetails.controls; }

    saveDetails(){

        this.submitted = true;

        if(this.formDetails.valid){

            this.carDetails.brand = this.formDetails.controls['brand'].value;
            this.carDetails.model = this.formDetails.controls['model'].value;
            this.carDetails.type = this.formDetails.controls['type'].value;
            this.carDetails.price = this.formDetails.controls['price'].value;

            this.stepDetails = false;
            this.stepChoose = true;

        }

    }

    uploadDetails(){

        if(this.formImages.valid){

            this.stepChoose = false;

            this.carDetails.userId = this.authenticationService.currentUserValue.id;

            this.carUploadService.uploadDetails(this.carDetails.userId, this.carDetails.model, 
                                                this.carDetails.brand, this.carDetails.type, this.carDetails.price)
                .pipe(
                    take(1)
                ).subscribe({
                    
                    next:data => {
                        //this.carDetails.id = data['carId'];
                        this.uploadImages(data['carId']);
                    }, 
                
                    error:error => {
                        console.error(error);
                        this.errorsService.sendError(error);
                        this.errorsService.registerError(error);
                    }
                });

        }

    }

    uploadImages(carId:number){

        const imagePath = 'CarsImages/';
        
        this.stepUploading = true;

        this.imageUrl.map( (image, index) => {
        
            const uploadImage = this.carUploadService.uploadImage(this.fileToUpload[index], index, imagePath + image, carId);

            let subscription1 = uploadImage
                .pipe(
                    filter( (event:HttpEvent<any>) => event.type == HttpEventType.UploadProgress),
                    tap( (event) => {
                        this.percentDone[index] = Math.round(100 * event['loaded'] / event['total'])
                    })
                ).subscribe( {
            
                    next:() => {
                        
                    }, 

                    error:error => {
                        console.error(error);
                        this.errorsService.sendError(error);
                        this.errorsService.registerError(error);
                    }

                });

            this.subscriptions.add(subscription1)

            let subscription2 = uploadImage
                .pipe(
                    filter( (event:HttpEvent<any>) => event.type == HttpEventType.Response),
                    filter( event => event['status'] == 200)
                ).subscribe( {

                    next:() => {
                        this.uploadingDone();
                    }, 

                    error:error => {
                        console.error(error);
                        this.errorsService.sendError(error);
                        this.errorsService.registerError(error);
                    }
            
                });

            this.subscriptions.add(subscription2)

        });

    }

    removeImage(id:number){
        this.imagePreUpload[id] = null;
    }

    uploadingDone(){

        this.stepUploading = false;
        this.stepUploaded = true;

        
    }

    ngOnDestroy(){
        
        if(this.subscriptions)
        this.subscriptions.unsubscribe()

    }

}

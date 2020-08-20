import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarUploadService } from '../services/car-upload.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sell-new-car',
  templateUrl: './sell-new-car.component.html',
  styleUrls: ['./sell-new-car.component.css']
})
export class SellNewCarComponent implements OnInit {

  imageError: string[] = [null, null, null];
  isImageSaved: boolean[] = [false, false, false];
  cardImageBase64: string[] = [null, null, null];
  fileToUpload = [null, null, null];
  imageUrl: string[] = [null, null, null];

  step:boolean[] = [true, false, false, false, false];
  uploading:boolean = false;
  percentDone:number[] = [0,0,0];
   
  // Size Filter Bytes
  max_size = 1048576; // 1MB
  allowed_types = ['image/png', 'image/jpeg'];
  height = 300;
  width = 300;

  detailsForm: FormGroup;
  carId: number;
  brand:string;
  model:string;
  type:string;
  userId: number;

  selectedType:string;

  subscriptionUploadDetails;
  subscriptionEventResponse;
  subscriptionEventUploadProgress;

  constructor(private formBuilder: FormBuilder, private carUploadService: CarUploadService, private authenticationService:AuthenticationService) { }

  ngOnInit() {

    this.detailsForm = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      type: ['', Validators.required],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.detailsForm.controls; }

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
        this.imageError[formN] = 'Only Images are allowed ( JPG | PNG )';

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
                         
              this.cardImageBase64[formN] = e.target.result;
              this.isImageSaved[formN] = true;
              this.imageUrl[formN] = fileInput.target.files[0].name;

            }

          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      
    }
  }

  removeImage(formN) {
    this.cardImageBase64[formN] = null;
    this.isImageSaved[formN] = false;
  }

  saveDetails(){
    this.brand = this.detailsForm.controls['brand'].value;
    this.model = this.detailsForm.controls['model'].value;
    this.type = this.detailsForm.controls['type'].value;

    this.step[0] = false;
    this.step[1] = true;

  }

  uploadDetails(){

    this.uploading=true;
    this.userId = this.authenticationService.currentUserValue.id;

    this.subscriptionUploadDetails = this.carUploadService.uploadDetails(this.userId, this.model, this.brand, this.type).subscribe( data => {

      this.carId=data['carId'];

      this.uploadImages();

    }, error => {
      console.error(error);
    });

  }

  uploadImages(){

    const imagePath = 'CarsImages/';

    for(let i=0;i<this.imageUrl.length;i++){

      const uploadImage = this.carUploadService.uploadImage(this.fileToUpload[i], i, imagePath+this.imageUrl[i], this.carId);
      this.subscriptionEventUploadProgress = uploadImage.pipe(
        filter( (event:HttpEvent<any>) => event.type == HttpEventType.UploadProgress),
          tap( (event) => this.percentDone[i] = Math.round(100 * event['loaded'] / event['total'])
        )
      ).subscribe( {
        next:() => {
          
        }, 
        error:error => {
          console.error(error);
        }
      })

      this.subscriptionEventResponse = uploadImage.pipe(
        filter( (event:HttpEvent<any>) => event.type == HttpEventType.Response),
        filter( event => event['status'] == 200)
      ).subscribe( {
          next:() => {
            this.step[4] = false;
            this.step[5] = true;
          }, 
          error:error => {
            console.error(error);
          }
      })
      /*
      this.subscriptionUploadImage = this.carUploadService.uploadImage(this.fileToUpload[i], i, imagePath+this.imageUrl[i], this.carId)
        .subscribe((event:HttpEvent<any>) => {

          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone[i] = Math.round(100 * event.loaded / event.total);
          }

          if (event.type === HttpEventType.Response) {
            if(event.status==200){
              this.step[4] = false;
              this.step[5] = true;
            }
          }
        });
      */
    }
    
  }

  nextStep(formN:number){

    if(formN == 0){
      this.step[1] = false;
      this.step[2] = true;
    }else if(formN == 1){
      this.step[2] = false;
      this.step[3] = true;
    }if(formN == 2){
      this.step[3] = false;
      this.step[4] = true;
      this.uploadDetails();
    }

  }

  ngOnDestroy(){
    if(this.subscriptionEventUploadProgress)
      this.subscriptionEventUploadProgress.unsubscribe();

    if(this.subscriptionEventResponse)
      this.subscriptionEventResponse.unsubscribe();

    if(this.subscriptionUploadDetails)
      this.subscriptionUploadDetails.unsubscribe();
  }
}

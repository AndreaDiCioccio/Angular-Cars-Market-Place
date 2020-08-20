import { Component, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../models/car';
import { CarsService } from '../services/cars.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject, BehaviorSubject, UnsubscriptionError } from 'rxjs';
import { map, subscribeOn, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { ErrorsService } from '../services/errors.service';
import { imagesUrl, carsImagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {

    imagesUrl = imagesUrl
    carsImagesUrl = carsImagesUrl

    car = new BehaviorSubject<Car>(null);
    idSelectedCar:string;

    constructor(public carsService: CarsService, 
                private route: ActivatedRoute, 
                public authService:AuthenticationService,
                private errorsService:ErrorsService) { }

    ngOnInit() {
    
        this.route.paramMap
            .pipe(
                map( (params:ParamMap) => params.get('carId') ),
                take(1)
            ).subscribe({
                
                next:carId => {
                this.idSelectedCar = carId;
                this.getCar(Number(carId));
                }, 
                
                error:error => {
                console.error(error);
                this.errorsService.sendError(error);
                this.errorsService.registerError(error);
                }

            });
        
    }

    getCar(carId:number){
    
        this.carsService.getCarFromId(carId)
            .pipe(
                take(1)
            ).subscribe({
                
                next:(car:Car) => {
                    this.car.next(car);
                    this.authService.currentUserValue ? this.setRecentCar(carId, car.image1) : null;
                },

                error:error =>{
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }

            });

    }

    setRecentCar(carId:number, carImage:string){

        this.carsService.setRecentCar(carId, carImage, this.authService.currentUserValue.id)
            .subscribe({

                next:() => {},

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }
                
            })

    }

}

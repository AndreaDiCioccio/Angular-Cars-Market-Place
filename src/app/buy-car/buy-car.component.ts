import { Component, OnInit, OnDestroy } from '@angular/core';
import { Car } from '../models/car';
import { CarsService } from '../services/cars.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ErrorsService } from '../services/errors.service';
import { imagesUrl, carsImagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-buy-car',
  templateUrl: './buy-car.component.html',
  styleUrls: ['./buy-car.component.css']
})
export class BuyCarComponent implements OnInit {

    car = new BehaviorSubject<Car>(null)
    //TO REFACTORING
    userId:number;
    ratingArray:string[] = new Array;
    isBuyed:boolean;
    isRated:boolean;
    ratingSuggestion:string;
    selectedCar:string

    imagesUrl = imagesUrl
    carsImagesUrl = carsImagesUrl

    readonly yellowStar:string = imagesUrl + "yellow-star.jpg";
    readonly greyStar:string = imagesUrl + "grey-star.jpg";

    
    constructor(public carsService:CarsService, 
                public route:ActivatedRoute, 
                public ratingService:RatingService,
                private errorsService:ErrorsService) { }

    ngOnInit(): void {

        this.route.paramMap
        .pipe(
            map( (params:ParamMap) => params.get('carId') ),
            take(1)
        ).subscribe({
            
            next:carId => {
                this.selectedCar = carId
            },

            error:error => {
                console.error(error);
                this.errorsService.sendError(error);
                this.errorsService.registerError(error);
            }

        });

        this.route.paramMap
            .pipe(
                take(1)
            ).subscribe({
        
                next:(params:ParamMap) => {
                    this.userId = Number(params.get('userId'))
                },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }
        
            })
        
        this.carsService.getCarFromId(this.selectedCar)
        .pipe(
            take(1)
        ).subscribe({

            next:(car:Car) => {
                this.car.next(car)
            },

            error:error => {
                console.error(error)
                this.errorsService.sendError(error)
                this.errorsService.registerError(error)
            }
        })

    }

    mouseEnter(star){

        switch (star) {
        case 1:
            this.ratingSuggestion ='insoddisfacente';
            break;
        
        case 2:
            this.ratingSuggestion = 'Non buono. Non soddisfa le mie aspettative';
            break;

        case 3:
            this.ratingSuggestion = 'va bene';
            break;

        case 4:
            this.ratingSuggestion = 'meglio di quanto mi aspettassi';
            break;
        
        case 5:
            this.ratingSuggestion = 'fantastico';
            break;    
            
        }

    }

    mouseLeave(){
        this.ratingSuggestion = '';
    }

    buy(){
        this.isBuyed = true;
    }

    rate(rate){

        for(let j=0;j<rate;j++){
            this.ratingArray[j] = this.yellowStar;      
        }

        for(let k=rate;k<=4;k++){
            this.ratingArray[k] = this.greyStar;
        }

        this.isRated = true;

        this.ratingService.rate(this.car.value.userId , rate)
        .pipe(
            take(1)
        ).subscribe()
            
    }
  
}

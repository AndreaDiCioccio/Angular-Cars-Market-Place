import { User } from './../models/user';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarsService } from '../services/cars.service';
import { take } from 'rxjs/operators';
import { ErrorsService } from '../services/errors.service';
import { CarWithObserved } from '../models/car';
import { imagesUrl, carsImagesUrl } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    carsImagesUrl = carsImagesUrl
    imagesUrl = imagesUrl

    discount:number[] = []

    user = new BehaviorSubject<User>(null);
    sellingCars = new BehaviorSubject<CarWithObserved[]>(null)
    observedCars = new BehaviorSubject<any[]>(null)

    constructor(private authenticationService: AuthenticationService, 
                    private carsService:CarsService, 
                    private errorsService:ErrorsService) { }

    ngOnInit() {

        this.user.next(this.authenticationService.currentUserValue);

        this.carsService.getSellingCars(this.user.value.id)
            .pipe(
                take(1)
            ).subscribe({

                next:cars => {
                    this.sellingCars.next(cars)
                    let countCars = cars.length

                    for(let j=0; j<countCars; j++)
                        this.discount.push(0)
                },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }
            })
        
        this.carsService.getObservedCarsByUser((this.user.value.id).toString())
            .pipe(
                take(1)
            ).subscribe({
                
                next:cars => {
                    this.observedCars.next(cars);
                    this.countObservedCars();
    
                },
    
                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }
    
            });

    }

    countObservedCars(){

        let observedCars = [...this.observedCars.value]
        let sellingCars = [...this.sellingCars.value]

        sellingCars.map( sellingCar => {

            sellingCar.count = 0
            
            observedCars.map( observedCar => {

                sellingCar.id == observedCar.carId ? sellingCar.count++ : null

            })

        })

        this.sellingCars.next(sellingCars)
  
    }

    setDiscountPrice(carId, index){
           
        this.carsService.setDiscountToCar(carId, this.discount[index])
            .subscribe({

                next:() => {},

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }
                
            })

    }

    updateDiscountPrice(event, carId, index){

        let discount = event.target.value

        this.discount[index] = discount
        let cars = [...this.sellingCars.value]

        cars.map( car => car.id == carId ? car.discount = discount : null)

        this.sellingCars.next(cars)

    }

}

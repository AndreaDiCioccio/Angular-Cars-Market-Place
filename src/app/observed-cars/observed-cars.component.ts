import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { CarWithObserved } from '../models/car';
import { User } from '../models/user';
import { CarsService } from '../services/cars.service';
import { take, tap } from 'rxjs/operators';
import { ErrorsService } from '../services/errors.service';
import { imagesUrl, carsImagesUrl } from '../../environments/environment';


@Component({
    selector: 'app-observed-cars',
    templateUrl: './observed-cars.component.html',
    styleUrls: ['./observed-cars.component.css']
})
export class ObservedCarsComponent implements OnInit {

    imagesUrl = imagesUrl
    carsImagesUrl = carsImagesUrl

    allCars = new BehaviorSubject<CarWithObserved[]>(null);
    filteredCars = new BehaviorSubject<CarWithObserved[]>(null);
    observedCars = new BehaviorSubject<any[]>(null);
    user = new BehaviorSubject<User>(null);

    obsToDelete:number[] = new Array();

    constructor( private authService:AuthenticationService, 
                    private carsService:CarsService, 
                    private errorsService:ErrorsService ) {  }

    ngOnInit(): void {

        this.user.next(this.authService.currentUserValue);

        this.getCars();

    }

    getCars(){

        this.carsService.getCars()
            .pipe(
                take(1)
            ).subscribe({
                
                next:(cars:CarWithObserved[]) => {
                    this.allCars.next(cars)
                },

                error:error => {
                    console.error(error)
                    this.errorsService.sendError(error)
                    this.errorsService.registerError(error)
                }

            });

        this.carsService.getObservedCarsByUser((this.user.value.id).toString())
            .pipe(
                take(1)
            ).subscribe({
                
                next:cars => {
                    this.observedCars.next(cars)
                    this.filterObserved()
                    this.countObservedCars()

                },

                error:error => {
                    console.error(error)
                    this.errorsService.sendError(error)
                    this.errorsService.registerError(error)
                }

            });

    }

    filterObserved(){  

        let allCars = [...this.allCars.value];
        let observedCars = [...this.observedCars.value];

        // filter, only observed cars MODIFICATO PER MOCK DATA, probabilmente dovrò modificare la query sql per ottenere già i dati ed eliminare definitivamente questa operazione
        //let filteredCars = allCars.filter(car => observedCars.some( obs => car.id == obs.carId));

        //this.filteredCars.next(filteredCars);
        this.filteredCars.next(observedCars);

    }

    //count how persons observe each observed cars
    countObservedCars(){
        
        let filteredCars = [...this.filteredCars.value];
        
        filteredCars.map( (car:CarWithObserved) =>{
        
            this.carsService.countObservedCar( (car.id).toString() )
                .pipe(
                    take(1)
                ).subscribe({
                    
                    next:(count:number) => {
                        car.count = count;            
                    },
                
                    error:error => {
                        console.error(error)
                        this.errorsService.sendError(error);
                        this.errorsService.registerError(error);
                    }

                });

        });

        this.filteredCars.next(filteredCars);

    }
    
    //inserisce in un array gli id degli oggetti da eliminare dalla lista di cars osservate
    //oppure rimuove l'id della car unchecked dalla lista di cars da eliminare
    checkBoxClicked(carId:number, event){

        let checked = event.target.checked;

        checked ? this.obsToDelete.push(carId) : this.obsToDelete = this.obsToDelete.filter( num => num != carId);

    }

    deleteObserved(){
        
        this.obsToDelete.map( num => {
        
            this.carsService.setDoNotObserve( num.toString(), (this.user.value.id).toString())
                .pipe(
                    take(1)
                )
                .subscribe({

                    next:() => {},

                    error:error => {
                        console.error(error);
                        this.errorsService.sendError(error);
                        this.errorsService.registerError(error);
                    }

                });

        this.getCars();

        });
    /*
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/observedCars']);
        });
    */  
    }
 
}

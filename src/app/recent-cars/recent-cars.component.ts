import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { CarRecent } from '../models/car-recent.model';
import { User } from '../models/user';
import { ErrorsService } from '../services/errors.service';
import { imagesUrl, carsImagesUrl} from '../../environments/environment'

@Component({
    selector: 'app-recent-cars',
    templateUrl: './recent-cars.component.html',
    styleUrls: ['./recent-cars.component.css']
})
export class RecentCarsComponent implements OnInit {

    carsImagesUrl = carsImagesUrl

    recentCars = new BehaviorSubject<CarRecent[]>(null);

    constructor( public carsService:CarsService, 
                public authService:AuthenticationService,
                private errorsService:ErrorsService ) { }

    ngOnInit(): void {

        this.loadRecentCars();

    }

    loadRecentCars(){

        if(this.authService.currentUserValue != null)
            this.carsService.getRecentCars(this.authService.currentUserValue.id)
                .pipe( 
                    map(cars => {
                        const uniques = new Set();
                        return cars.reduce((acc, current) => {  
                            if (!uniques.has(current.id)) {
                                acc.push(current);
                                uniques.add(current.carId);
                                //uniques.add(current.id);
                            }
                            return acc;
                        }, []);
                    }),
                    take(1)
                ).subscribe({

                    next:cars => {
                        // dovrebbe prendere le prime 8 auto, in quanto la query ordina in id discendente
                        //cars.slice(-8)[0];
                        this.recentCars.next(cars);
                    },

                    error:error => {
                        console.error(error);
                        this.errorsService.sendError(error);
                        this.errorsService.registerError(error);
                    }
        
                });

    }

}

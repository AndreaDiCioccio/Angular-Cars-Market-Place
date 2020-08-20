import { Component, OnInit, Input } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { map, catchError, take } from 'rxjs/operators';
import { Car } from '../models/car';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { ErrorsService } from '../services/errors.service';
import { carsImagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.css']
})
export class UserGalleryComponent implements OnInit {

    carsImagesUrl = carsImagesUrl

    cars = new BehaviorSubject<Car[]>(null);
    @Input() userId: number;
    @Input() username: string;


    constructor(private carsService:CarsService, private errorsService:ErrorsService) { }

    ngOnInit() {

        this.carsService.getCars()
        .pipe(
            take(1),
            map( (cars:Car[]) => cars.filter(car => car.userId == this.userId) ),
        ).subscribe({

            next:cars => this.cars.next(cars),

            error:error => {
                console.error(error);
                this.errorsService.sendError(error);
                this.errorsService.registerError(error);
            }
        })

    }

}

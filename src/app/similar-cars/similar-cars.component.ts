import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Car } from '../models/car';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ErrorsService } from '../services/errors.service';
import { imagesUrl, carsImagesUrl } from '../../environments/environment';

@Component({
  selector: 'app-similar-cars',
  templateUrl: './similar-cars.component.html',
  styleUrls: ['./similar-cars.component.css']
})
export class SimilarCarsComponent implements OnInit {

  similarCars = new BehaviorSubject<Car[]>(null);

  @Input() carType: string;
  @Input() idCarViewed: number;
  //url = 'assets/';
  imagesUrl = imagesUrl
  carsImagesUrl = carsImagesUrl

  constructor( private carsService:CarsService,
                private errorsService:ErrorsService ) { }

  ngOnInit() {

    this.carsService.getSimilarCars(this.carType)
      .pipe(
        take(1),
        map( car => car.filter(car => car.id != this.idCarViewed))
      ).subscribe({

        next:cars => {
          this.similarCars.next(cars);
        },

        error:error => {
          console.error(error);
          this.errorsService.sendError(error);
          this.errorsService.registerError(error);
        }
      
      });

  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, take, tap } from 'rxjs/operators';
import { Car } from '../models/car';
import { CarsService } from '../services/cars.service';
import { ErrorsService } from '../services/errors.service';
import { imagesUrl } from '../../environments/environment';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

    imagesUrl = imagesUrl
    
    username:string;
    userId:number;

    constructor(public userService:UserService, 
                private route: ActivatedRoute, 
                private carsService:CarsService,
                private errorsService:ErrorsService) { }

    ngOnInit() { 

        this.route.paramMap
        .pipe(
        take(1),
        map( (params:ParamMap) => parseInt(params.get('userId')) ))
            .subscribe({

                next:userId => {
                    this.userId = userId;
                },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }

            });

        this.userService.getUserById(this.userId)
            .pipe(
                take(1)
            ).subscribe({
                
                next:user => {
                    this.username = user.username;
                    },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }

            })
        
    }

}

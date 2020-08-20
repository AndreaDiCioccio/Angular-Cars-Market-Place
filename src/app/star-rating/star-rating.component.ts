import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { RatingService } from '../services/rating.service';
import { filter, partition, tap, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ErrorsService } from '../services/errors.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() userId: number;
  @Input() size:string;

  ratingArray = new BehaviorSubject<string[]>(null);
  rating:number;;
  count:number;

  ratingStarsContainerStyle;
  ratingStarsStyle;
  ratingStyle;
  ratingCountStyle;

  width;
  height;

  yellowStar:string = "/assets/images/yellow-star.jpg";
  midStar:string = "/assets/images/mid-star.jpg";
  greyStar:string = "/assets/images/grey-star.jpg";
  
  constructor( public ratingService:RatingService,
                private errorsService:ErrorsService) { }

    ngOnInit(): void {

        const observableRating:Observable<any> = this.ratingService.getRating(this.userId);
        
        let ratingArray:string[] = new Array;
        
        // se non c'è nessun rating assegna tutte stelle grigie
        observableRating
            .pipe(
                take(1),
                filter( data => data['count'] === 0)
            ).subscribe({
            
                next:() => {

                    this.rating = 0;

                    for(let k=0;k<=4;k++){
                        ratingArray[k] = this.greyStar;
                    }

                    this.ratingArray.next(ratingArray);

                },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }

            });

        // se ci sono uno o piu rating, assegna stelle gialle, mezze stelle e stelle grigie
        observableRating
            .pipe(
                take(1),
                filter( data => data['count'] > 0)
            ).subscribe( {
            
                next:data => {

                    this.count = data['count'];
                    
                    this.rating = data['rating'] / this.count;

                    let trunc = Math.trunc(this.rating);
                    
                    for(let j=0;j<trunc+1;j++){
                
                        if(this.rating>j && this.rating<j+1){
                            ratingArray[j] = this.midStar;
                        }else {
                            if(j!=trunc){
                                ratingArray[j] = this.yellowStar;
                            }
                        }
                    
                    }
                
                    if (this.rating == Math.floor(this.rating)){
                        for(let k=trunc;k<=4;k++){
                        ratingArray[k] = this.greyStar;
                        }
                    } else {
                        for(let k=trunc+1;k<=4;k++){
                        ratingArray[k] = this.greyStar;
                        }
                    }

                    this.ratingArray.next(ratingArray);

                },
            
                error:error => {
                console.error(error);
                this.errorsService.sendError(error);
                this.errorsService.registerError(error);
                }

            });

        if(this.size == 'small'){

            this.ratingStarsContainerStyle = {
                'display': 'flex'
            }

            this.ratingStarsStyle = {
                'height' : '18px',
                'width' : '18px'
            }

            this.ratingStyle = {
                'font-size':'16px',
            }

            this.ratingCountStyle = {
                'font-size':'12px',
            }

        }else if(this.size =='large'){

            this.ratingStarsContainerStyle = {
                'width':'48px',
            }

            this.ratingStarsStyle = {
                'size':'40px'
            }

            this.ratingStyle = {
                'font-size':'48px',
            }

            this.ratingCountStyle = {
                'font-size':'40px',

            }

        }

    }

}

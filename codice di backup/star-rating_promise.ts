import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() userId: number;

  ratingArray:string[] = [];
  rating:number;
  count:number;

  yellowStar:string = "/assets/images/yellow-star.jpg";
  midStar:string = "/assets/images/mid-star.jpg";
  greyStar:string = "/assets/images/grey-star.jpg";

  subscriptionGetRating;
  
  constructor(private userService:UserService, public ratingService:RatingService) { }

  ngOnInit(): void {

    this.ratingService.getRating(this.userId).toPromise().then(  data => {
      
      this.count = data['count'];
      this.rating = data['rating'] / this.count;

      return

    }).then( () => {
      if(this.count == 0){

        this.rating = 0;

        for(let k=0;k<=4;k++){
          this.ratingArray[k] = this.greyStar;
        }

      } else{

        let trunc = Math.trunc(this.rating);
    
        for(let j=0;j<trunc+1;j++){
    
          if(this.rating>j && this.rating<j+1){
            this.ratingArray[j] = this.midStar;
          }else {
            if(j!=trunc)
              this.ratingArray[j] = this.yellowStar;
          }
          
        }
    
        if (this.rating == Math.floor(this.rating)){
          for(let k=trunc;k<=4;k++){
            this.ratingArray[k] = this.greyStar;
          }
        } else {
          for(let k=trunc+1;k<=4;k++){
            this.ratingArray[k] = this.greyStar;
          }
        }

      }
      
    }).catch( error => {
      console.error(error);
    });

  }

  ngOnDestroy(){
    if(this.subscriptionGetRating)
      this.subscriptionGetRating.unsubscribe();
  }

}

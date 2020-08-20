import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { serverUrl, useMock } from '../../environments/environment';
import { retry, tap, mergeMap, map, reduce, count, scan, catchError, take } from 'rxjs/operators';
import { users } from '../../app/mockData';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

    headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'application/json'
    });

    cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

    constructor(private http: HttpClient) { }

    rate(userId, rate){

        if(!useMock){

            console.log('ratingService.rate()');

            let params = new HttpParams()
                .set('userId', userId)
                .set('rate', rate);
                
            let options = {headers:this.headers, params:params}    

            return this.http.get(serverUrl + 'rate', options )
                .pipe(
                    retry(3)
                )

        }else{

            users.map( user => {
                user.id == userId ? user.rating.push(rate) : null
            })
  
            return of()

        }

    }

    getRating(userId){

        if(!useMock){
        
            let params = new HttpParams()
                    .set('userId', userId);

            let options = {headers:this.headers, params:params} 

            return this.http.get(serverUrl + 'getRate', options )
                .pipe(
                    retry(3)
                )

        }else{
 
            return this.http.get(`api/users/${userId}`)
                .pipe(
                    map( (user:any) => ({ 
                        rating: user.rating.reduce((acc, cur) => acc + cur,0),  
                        count: user.rating.length 
                    }))
                )

        }

    }
}

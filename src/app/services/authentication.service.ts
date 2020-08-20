import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, retry, tap, filter, switchMap } from 'rxjs/operators';

import moment from "moment";
import { ErrorsService } from './errors.service';
import { serverUrl } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    
    private currentUserSubject: BehaviorSubject<User>;

    headers = {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
    };
      
    constructor(private http: HttpClient, private errorsService:ErrorsService) {
        
        if(this.isExpired()){
           
            this.currentUserSubject = new BehaviorSubject<User>(null);
            this.logout();
            
        } else {
           
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        
        }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
/*        
        let params = new HttpParams()
            .set('username', username)
            .set('password', password);
        
        let options = { headers: this.headers, params: params };
        
        return this.http.get<any>(serverUrl + 'login', options)
            .pipe(
                map(data => {
                    this.setSession(data)
                    this.currentUserSubject.next(data.user)                
                }),
                retry(3)

            );
 */

        return this.http.get<any>(`api/users/`)
            .pipe(
                switchMap( user => user),
                filter( (user:any) => user.username == username),
                map( user => ({
                    idToken:'abcdefg', 
                    expiresIn:10000,
                    user:user
                })),
                tap( data => {
                    this.setSession(data)
                    this.currentUserSubject.next(data.user)  
                })
            )

    }

    logout() {
      
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);

    }

    private setSession(authResult) {

        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
        localStorage.setItem('currentUser', JSON.stringify(authResult.user));

    }   

    public isLoggedIn() : boolean{
        return moment().isBefore(this.getExpiration());
    }

    public isExpired() {
        return moment().isAfter(this.getExpiration());
    }

    public isLoggedOut() :boolean {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        
        return moment(expiresAt);
    }    
}

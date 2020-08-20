import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';

import { User } from '../models/user';
import { tap, map } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'application/json'
    });
      
    host = 'http://localhost:8080/';

    constructor(private http: HttpClient) { }

    register(user: User) {
       
        let params = new HttpParams()
            .set('username', user.username)
            .set('firstname', user.firstName)
            .set('lastname', user.lastName)
            .set('password', user.password)
            .set('email', user.email)

        let options = {headers:this.headers, params:params}    
        return this.http.post(this.host + 'register', options );
    }

    getUser(userId:number){
        let params = new HttpParams().set('userId', String(userId));
        let options = { headers: this.headers, params: params };

        return this.http.get(this.host + 'getUserById', options);
    }

}

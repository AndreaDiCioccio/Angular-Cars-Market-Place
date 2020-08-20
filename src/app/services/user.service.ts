import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';

import { User } from '../models/user';
import { map, retry } from 'rxjs/operators';
import { serverUrl, useMock } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'application/json'
    });

    constructor(private http: HttpClient) { }

    register(user:User) {
       
        let params = new HttpParams()
            .set( 'username', user.username )
            .set( 'firstname', user.firstName )
            .set( 'lastname', user.lastName )
            .set( 'password', user.password )
            .set( 'email', user.email );

        let options = { headers:this.headers, params:params };

        return this.http.get( serverUrl + 'register', options )
            .pipe(
                retry(3)
            )
    }

    getUserById(userId:number){

        if(!useMock){
        
            let params = new HttpParams().set( 'userId', String(userId) );
            let options = { headers: this.headers, params: params };

            return this.http.get(serverUrl + 'getUserById', options)
                .pipe(
                    retry(3),
                    map((user:User[]) => user[0])
                )
        }else{

            return this.http.get<any>(`/api/users/${userId}`)

        }

    }

}
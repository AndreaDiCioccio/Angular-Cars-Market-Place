import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { serverUrl } from 'src/environments/environment';
import { take, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ErrorsService {

  constructor( private http:HttpClient ) { }

  private errorsSubject = new BehaviorSubject<string[]>(null);
  public errors$:Observable<string[]> = this.errorsSubject.asObservable();

  headers = {
    'Content-Type' : 'application/json',
    'Accept': 'application/json'
  };

  registerError(e){

    let params = new HttpParams().set('error', e);
    let options = {headers:this.headers, params:params}

    return this.http.get<any>(serverUrl + 'registerError', options)
        .pipe(
            retry(3),
            take(1)
        ).subscribe();

  }

  sendError(err){
    let errors = new Array;
    
    if(this.errorsSubject.value)
        errors = [...this.errorsSubject.value];

    errors.push(err);

    //this.errorsSubject.next(errors);

  }

}

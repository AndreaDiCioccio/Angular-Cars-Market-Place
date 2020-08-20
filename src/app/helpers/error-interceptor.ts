import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorsService } from '../services/errors.service';

@Injectable({ providedIn: 'root' })

export class ErrorInterceptor implements HttpInterceptor {

    constructor( public errorService:ErrorsService ) {} 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //next.handle(request) trasforma un HttpRequest in uno stream di HttpEvents, 
        //restituisce un Observable <HttpEvent> 'Union type for all possible events on the response stream.'
        return next.handle(request)
            .pipe(
                catchError(err => {

                    console.error('error-interceptor:SERVER ERROR: status=' + err.status + ' message=' + err.message + ' msg='+err.msg);
                                
                    let e = 'SERVER ERROR: status:' + err.status;

                    if(err.message)
                        e += ' - ' + err.message ;

                    if(err.msg)
                        e += ' - ' + err.msg;
                    
                    this.errorService.sendError(e);

                    var error = ''

                    err.err != undefined && err.statusText != undefined ? error = err.error.msg : null
                    
                    //const error = err.error.msg || err.statusText;
                    
                    return throwError(error);

                })
            );

    }

}
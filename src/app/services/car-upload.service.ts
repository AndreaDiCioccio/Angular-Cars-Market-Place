import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEventType, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { serverUrl, useMock } from '../../environments/environment';
import { shareReplay, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarUploadService {

    constructor(private http:HttpClient) { }

    headers = {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
    };

    headersNo = {
        
    }

    uploadDetails(userId, model, brand, type, price){

        if(!useMock){
            let params = new HttpParams()
                .set('userId', userId)
                .set('model', model)
                .set('brand', brand)
                .set('type', type)
                .set('price', price);
            
            let options = { headers: this.headers, params: params };

            return this.http.post(serverUrl+ 'uploadCarDetails', {}, options)
                .pipe(
                    retry(3)
                )

        }else{



        }
        
    }

    uploadImage(image, imageN, imageUrl, carId) {

        if(!useMock){
        
            let formData: FormData = new FormData();
            formData.append('image', image, image.name);

            let params = new HttpParams()
                .set('image', image)
                .set('imageN',imageN)
                .set('imageUrl', imageUrl)
                .set('carId', carId);

            let options = {headers:this.headersNo, observe:'events' as 'body', params:params, reportProgress:true};
            
            return this.http.post<HttpEvent<any>>(serverUrl + 'uploadCarImage', formData, options)
                .pipe(
                    retry(3),
                    shareReplay() //perche??
                )

        }else{



        }

    }

}

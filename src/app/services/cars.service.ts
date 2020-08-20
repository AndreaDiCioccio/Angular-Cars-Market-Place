import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Car, ObservedCar } from '../models/car';
import { Injectable } from '@angular/core';
import { BrandCB } from '../models/brandCB';
import { shareReplay, map, retry, tap, groupBy, toArray, mergeMap, zip, reduce, concatMap, flatMap, distinct, switchMap, filter, count, delay } from 'rxjs/operators';
import { TypeCB } from '../models/type-cb';
import { CarRecent } from '../models/car-recent.model';
import { CarWithObserved } from '../models/car';
import { serverUrl, useMock } from '../../environments/environment';
import { of } from 'rxjs';
import { cars, users } from '../../app/mockData'

@Injectable({
    providedIn: 'root'
})
export class CarsService {

    constructor(private http:HttpClient) { }

    headers = {
        'Content-Type' : 'application/json',
        'Accept': 'application/json'
    };

    getCars(){

        if(!useMock){

            let options = {headers:this.headers}
            return this.http.get<any>(serverUrl + 'getCars', options)
                .pipe(
                    retry(3)
                )

        }else{

            return this.http.get('api/cars')

        }
    }

    getSellingCars(userId){

        if(!useMock){

            let params = new HttpParams().set('userId', userId);
            let options = {headers:this.headers, params:params}
            
            return this.http.get<CarWithObserved[]>(serverUrl + 'getSellingCars', options)
                .pipe(
                    retry(3)
                )

        }else{         

            return this.http.get<CarRecent[]>(`api/users/${userId}`)
                .pipe(
                    map( (user:any) => user.cars)
                )

        }

    }

    setDiscountToCar(carId, discount){

        if(!useMock){

            let params = new HttpParams()
                .set('carId', carId)
                .set('discount', discount)
            let options = { headers:this.headers, params:params }

            return this.http.get<any>(serverUrl + 'setDiscountToCar', options)
                .pipe(
                    retry(3)
                )
        
        }else{
 
            cars.map( car => {
                car.id ==  carId  ? car.discount = discount : null
            })

            users.map( user => {
                user.cars.map( userCar => {
                    userCar.id ==  carId ? userCar.discount = discount : null
                })
            })

            return of()

        }
    }

    getCarFromId(carId){

        if(!useMock){

            let params = new HttpParams().set('carId', carId);
            let options = {headers:this.headers, params:params};

            return this.http.get<Car[]>(serverUrl + 'getCarFromId', options)
            .pipe(
                retry(3),
                map( (car:Car[]) => car[0]),
                shareReplay()
            );

        }else{

            return this.http.get(`api/cars/${carId}`)

        }
    }

    getRecentCars(userId){

        if(!useMock){

            let params = new HttpParams().set('userId', userId);
            let options = {headers:this.headers, params:params};
            
            return this.http.get<CarRecent[]>(serverUrl + 'getRecentCars', options)
                .pipe(
                    retry(3)
                )
        
        }else{

            return this.http.get<CarRecent[]>(`api/users/${userId}`)
                .pipe(
                    map( (user:any) => user.recentCars),
                    map( cars => cars.map( (car:any) => ({...car, carId: car.id}))),
                    map( cars => cars.reverse())
                )

        }
    }

    setRecentCar(carId, imageURL, userId){

        if(!useMock){
        
            let params = new HttpParams()
            .set('carId', carId)
            .set('imageURL', imageURL)
            .set('userId', userId);
            let options = {headers:this.headers, params:params};

            return this.http.get<any>(serverUrl + 'setRecentCar', options)
                .pipe(
                    retry(3)
                )
     
        }else{

            let carObj

            cars.map( car => {
                car.id == carId ? carObj = car : null
            })

            users.map( user => {
                user.recentCars.push(carObj)
            })

            return of()

        }

    }

    getSimilarCars(carType){

        if(!useMock){

            let params = new HttpParams().set('carType', carType);
            let options = {headers:this.headers, params:params};

            return this.http.get<Car[]>(serverUrl + 'getSImilarCars', options)
                .pipe(
                    retry(3)
                )
         
        }else{

            return this.http.get<Car[]>('api/cars')
                    .pipe(
                        map( cars => cars.filter( (car:any) => car.type == carType))
                    )

        }
    }

    getBrands(){

        if(!useMock){

            let options = { headers:this.headers }

            return this.http.get<BrandCB[]>(serverUrl + 'getBrands', options)
                .pipe(
                    retry(3)
                )

        }else{

            return this.http.get('api/cars/')
                .pipe(
                    mergeMap((cars:Car[]) => cars),
                    map( (car:Car) => car.brand),
                    distinct(),
                    map( brand => ({name:brand, checked:false, count:0}) ),
                    toArray()
                )

        }
    }

    getTypes(){

        if(!useMock){

            let options = { headers:this.headers }

            return this.http.get<TypeCB[]>(serverUrl + 'getTypes', options)
                .pipe(
                    retry(3)
                )

        }else{

            return this.http.get('api/cars/')
                .pipe(
                    mergeMap((cars:Car[]) => cars),
                    map( (car:Car) => car.type),
                    distinct(),
                    map( type => ({name:type, checked:false, count:0}) ),
                    toArray()
                )

        }

    }

    getObservedCarsByUser(userId:string) {

        if(!useMock){

            let params = new HttpParams()
                .set('userId', userId);
            let options = {headers:this.headers, params:params};
            
            return this.http.get<ObservedCar[]>(serverUrl + 'getObservedCarsByUser', options)
                .pipe(
                    retry(3)
                )

        }else{

            return this.http.get<ObservedCar[]>(`api/users/${userId}`)
                .pipe(
                    map( (user:any) => user.observedCars),
                    map( (observed:any[]) => observed.map( car => ({ ...car, carId: car.id })))
                )

        }
    }
/* 
    getObservedCars(userId:string) {
    
        let params = new HttpParams()
            .set('userId', userId);
        let options = {headers:this.headers, params:params};
        
        return this.http.get<any[]>(serverUrl + 'getObservedCars', options)
            .pipe(
                retry(3)
            )
    
    }
 */
    setObserve(carId:string, userId:string){

        if(!useMock){

            let params = new HttpParams()
                .set('userId', userId)
                .set('carId', carId);
            let options = {headers:this.headers, params:params};
            
            return this.http.get(serverUrl + 'setObserve', options)
                .pipe(
                    retry(3)
                )

        }else{

            let carObj

            cars.map( car => {
                car.id == Number(carId) ? carObj = car : null
            })

            users.map( user => {
                user.id == Number(userId) ? user.observedCars.push(carObj) : null
            })

            return of()

        }

    }

    setDoNotObserve(carId:string, userId:string){

        if(!useMock){
        
            let params = new HttpParams()
                .set('userId', userId)
                .set('carId', carId);
            let options = {headers:this.headers, params:params};
            
            return this.http.get(serverUrl + 'setDoNotObserve', options)
                .pipe(
                    retry(3)
                )
        }else{

            let index

            users.map( user => {
                if(user.id == Number(userId)){
                    user.observedCars.map( observedCar => {
                        if(observedCar.id == Number(carId)){
                            index = user.observedCars.findIndex( car => car.id == observedCar.id)
                        }
                    })
                }

                user.observedCars.splice(index, 1)
            })

            return of()

        }

    }
    //return a single count of each observed car
    countObservedCar(carId:string){

        if(!useMock){

            let params = new HttpParams()
                .set('carId', carId);
            let options = {headers:this.headers, params:params};
            
            return this.http.get<number>(serverUrl + 'countObservedCar', options)
                .pipe(
                    retry(3)
                )

        }else{

            return this.http.get<any>('api/observedCars')
                .pipe(
                    map( cars => cars.map( car => car.id)),
                    map( ids => ids.filter( id => id == carId)), 
                    mergeMap(id => id),
                    count()

                )

        }

    }

}


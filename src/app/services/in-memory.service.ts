import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { cars, ratings, users, observedCars } from '../mockData'

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService{

    createDb() {
        return { cars, ratings, users, observedCars } // add as many end-points you want
      }

}

import { CarsService } from '../services/cars.service';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { BrandCB } from '../models/brandCB';
import { TypeCB } from '../models/type-cb';
import { take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { CarWithObserved } from '../models/car'
import { ErrorsService } from '../services/errors.service';
import { ObservedCar } from '../models/car';
import { imagesUrl, carsImagesUrl } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})

//@HostListener('document:click', ['$event'])

export class GalleryComponent implements OnInit {

    imagesUrl = imagesUrl
    carsImagesUrl = carsImagesUrl

    allCars = new BehaviorSubject<CarWithObserved[]>(null);
    filteredCars = new BehaviorSubject<CarWithObserved[]>(null);
    observedCars = new BehaviorSubject<any[]>(null);
    brands = new BehaviorSubject<BrandCB[]>(null);
    types = new BehaviorSubject<TypeCB[]>(null);
    
    checkboxBrandAll:boolean = true;
    checkboxTypeAll:boolean = true;
        
    constructor(public carsService: CarsService, 
                public authService:AuthenticationService,
                private errorsService:ErrorsService) { }

    ngOnInit() {

        this.carsService.getBrands()
            .pipe(
                take(1)
            ).subscribe( {
                
                next:(brands:BrandCB[]) => {
                    this.brands.next(brands);
                }, 

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }

            });

        this.carsService.getTypes()
            .pipe(
                take(1)
            )
            .subscribe({
                
                next:(types:any[]) => {
                    this.types.next(types);
                },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }
            
            });

        if(this.authService.currentUserValue){
            this.carsService.getObservedCarsByUser((this.authService.currentUserValue.id).toString())
                .pipe(
                    take(1)
                ).subscribe({

                    next:(observed:ObservedCar[]) => {
                        this.observedCars.next(observed)
                        this.getCars()
                    },

                    error:error => {
                        console.error(error)
                        this.errorsService.sendError(error)
                        this.errorsService.registerError(error)
                    }

                });
        }else
            this.getCars()
    }

    getCars(){
        
        this.carsService.getCars()
            .pipe(
                take(1)
            ).subscribe({
            
                next:(cars:CarWithObserved[]) => {
            
                    this.allCars.next(cars);

                    if(this.authService.currentUserValue)
                        this.setObservedCars();

                    this.filterCars();
                
                },

                error:error => {
                    console.error(error);
                    this.errorsService.sendError(error);
                    this.errorsService.registerError(error);
                }

            });

    }

    // setta la proprietà observed di ogni car su true se è presente nell'array observed(cars)
    setObservedCars(){

        let allCars:CarWithObserved[] = [...this.allCars.value]
        let observedCars:ObservedCar[] = [...this.observedCars.value];

        allCars.map( car => {
            //Il metodo some() verifica se almeno un elemento nell'array passa la verifica implementata dalla funzione fornita.
            observedCars.some( obs => obs.carId == car.id ) ? car.observed = true : null
        
        })
        
        // nel template non viene usato allCars, ma viene usato filteredCars
        this.allCars.next(allCars);

    }

    filterCars(){
        
        let allCars = [...this.allCars.value];
        let brands = [...this.brands.value];
        let types = [...this.types.value];
        
        const checkedBrands = brands.filter(brand => brand.checked);
        const checkedTypes = types.filter(type => type.checked);

        let filteredCars:CarWithObserved[];

        if(!this.checkboxBrandAll && !this.checkboxTypeAll){

            filteredCars = allCars.filter(car => checkedBrands.find(brand => brand.name === car.brand) && checkedTypes.find(type => type.name === car.type));

        } else if(!this.checkboxBrandAll && this.checkboxTypeAll){

            filteredCars = allCars.filter(car => checkedBrands.find(brand => brand.name === car.brand));
        
        }else if(this.checkboxBrandAll && !this.checkboxTypeAll){
        
            filteredCars = allCars.filter(car => checkedTypes.find(type => type.name ===car.type));

        }else{

            filteredCars = [...allCars];
        
        }

        this.filteredCars.next(filteredCars);
        
        this.countBrands(filteredCars);
        this.countTypes(filteredCars);
    
    }
    
    // conta le occorrenze di ogni brand, ad esempio ferrari(2)
    countBrands(cars:CarWithObserved[]){
        
        let brands = [...this.brands.value];
        
        brands.map( brand => {
            
            let count = 0;
            
            cars.map( car => {
                brand.name == car.brand ? count++ : null
            })
            
            brand.count = count;
        
        })
        
        this.brands.next(brands);
    
    }

    // conta le occorrenze di ogni type, ad esempio jeep(2)
    countTypes(cars:CarWithObserved[]){

        let types = [...this.types.value];
    
        types.map( type => {
            let count = 0;
            cars.map( car => {
                type.name == car.type ? count++ : null
            })
            type.count = count;
        })

        this.types.next(types);
    
    }
        
    checkboxChange(event){
        
        let name = event.target.name;
        let checked = event.target.checked;
        
        //BRANDS
        let brands:BrandCB[] = this.brands.value;

        if(name =='allBrands'){
        
            brands.map(brand => brand.checked = false);

            this.brands.next(brands);

        } else if(name == 'otherBrands'){

        if(checked == true){

            this.checkboxBrandAll = false;

        } else {

            let isOneChecked:boolean = false;
            brands.map(brand => brand.checked ? isOneChecked = true : null)

            if(!isOneChecked)
            this.checkboxBrandAll = true;

        }

        this.brands.next(brands);
        
        }

        // TYPES
        let types:TypeCB[] = this.types.value;

        if(name =='allTypes'){
    
        types.map(type => type.checked = false)
    
        this.types.next(types);

        } else if(name == 'otherTypes'){

        if(checked == true){

            this.checkboxTypeAll = false;

        } else {

            let isOneChecked:boolean = false;
            types.map (type => type.checked ? isOneChecked = true : null)

            if(!isOneChecked)
            this.checkboxTypeAll = true;

        }

        this.types.next(types);
        
        }

        this.filterCars();

    }

    //ordina le cars in base all'opzione selezionata
    orderBoxChange(event){

        const order = event.target.value;
        const cars = [...this.filteredCars.value];

        if(order === 'Brand'){
        
            cars.sort((a, b) => (a.brand > b.brand) ? 1 : ((b.brand > a.brand) ? -1 : 0))
        
        }else if (order ==='Model'){
        
            cars.sort((a, b) => (a.model > b.model) ? 1 : ((b.model > a.model) ? -1 : 0))

        }

        this.filteredCars.next(cars);

    }

    // setta una car come observed e aggiorna la lista
    observe(carId:number){
        
        this.carsService.setObserve(carId.toString(), (this.authService.currentUserValue.id).toString())
        .pipe(
            take(1)
        ).subscribe();
        
        let filteredCars = [...this.filteredCars.value];
        
        filteredCars.map( car => car.id == carId ? car.observed = true : null);

        this.filteredCars.next(filteredCars)
    
    }

    // setta una car come not observed e aggiorna la lista
    dontObserve(carId:number){
        this.carsService.setDoNotObserve(carId.toString(), 
        (this.authService.currentUserValue.id).toString() )
        .pipe(
            take(1)
        ).subscribe();
        
        let filteredCars = [...this.filteredCars.value];
        
        filteredCars.map( car => car.id == carId ? car.observed = false : null);
    
        this.filteredCars.next(filteredCars)

    }

    showFilterForSmall(){
        let filtersBox = document.getElementById("dropdown-filter");
        filtersBox.className = "dropdown-filter-show"
    }

    hideFilterForSmall(){
        let filtersBox = document.getElementById("dropdown-filter");
        filtersBox.className = "dropdown-filter-hide"
    }

}


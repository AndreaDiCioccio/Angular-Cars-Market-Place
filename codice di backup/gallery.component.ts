import { CarsService } from '../services/cars.service';
import { Car } from './../models/car';
import { Component, OnInit } from '@angular/core';
import { BrandCB } from '../models/brandCB';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  url = 'assets/';
  cars:Car[];
  allCarsCars:Car[];
  filteredCars:Car[];
  brands:BrandCB[] = [];
  selectedBrand:string;
  checkboxAll:any = {checked:true};
  subscriptionCars;
  subscriptionBrands;
  
  constructor(public carsService: CarsService) { 
    
  }

  ngOnInit() {

    this.getCars();

    this.subscriptionBrands = this.carsService.getBrands().subscribe( {
        
      next:(brands:BrandCB[]) => {
          this.brands = brands
        }, 

      error:error => {
         console.error(error);
      }

    });
  
  }

  getCars(){
    
    this.subscriptionCars = this.carsService.getCars().subscribe({
      
      next:data => {
        this.allCarsCars = data;
        this.filterCars();
      },

      error:error => {
        console.error(error);

      }

    });

  }

  filterCars(){
    if(!this.checkboxAll.checked){
      // array con solo i brand selezionati e con solo i brand senza altre proprietà
      const checkedBrands = this.brands.filter(brand => brand.checked);
      // filtro i dati dal server prelevando solo quelli che hanno un brand presente in checkedBrands
      this.filteredCars = this.allCarsCars.filter(car => checkedBrands.find(brand => brand.brand === car.brand));
      this.filteredCars.sort((a,b) => a.brand.localeCompare(b.brand));
    } else {
      this.filteredCars = this.allCarsCars;
    }
  }

  checkboxChange(event){
    
    let name = event.target.name;
    let checked = event.target.checked;
    
    if(name=='all'){
      if(checked==true){
        for(let i=0;i<this.brands.length;i++){
          this.brands[i].checked = false;
        }
      }
    } else {
      if(checked==true){
        // checkbox all = unchecked
        this.checkboxAll.checked = false;
      } else {
        let isOneChecked:boolean = false;
        for(let i=0;i<this.brands.length;i++){
          if(this.brands[i].checked)
            isOneChecked = true;
        }
        if(!isOneChecked)
          this.checkboxAll.checked = true;
      }

    }

    this.filterCars();

  }

  ngOnDestroy(){
    this.subscriptionCars.unsubscribe();
    this.subscriptionBrands.unsubscribe();
  }
}

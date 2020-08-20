import { UserProfileComponent } from './user-profile/user-profile.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth-guard';
import { UserPageComponent } from './user-page/user-page.component';
import { SellNewCarComponent } from './sell-new-car/sell-new-car.component';
import { BuyCarComponent } from './buy-car/buy-car.component';
import { ObservedCarsComponent } from './observed-cars/observed-cars.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path:'register', component: RegisterComponent },
    { path:'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] }, //canActivate è in auth-guard.ts
    { path:'userPage/:userId', component: UserPageComponent },
    { path:'sellNewCar', component: SellNewCarComponent, canActivate: [AuthGuard] },
    { path:'observedCars', component: ObservedCarsComponent, canActivate: [AuthGuard] },
    { path:'buyCar/:carId', component: BuyCarComponent, canActivate: [AuthGuard] },
    { path: 'gallery', 
        children:[
        { path:'', component: GalleryComponent },
        { path:'details/:carId', component: CarDetailComponent } 
        ]
    },
    { path:'**', component: HomeComponent}
  
];

const routerModuleWithProviders: ModuleWithProviders<RouterModule> =
  //registrare i percorsi, configurare e inizializzare il router stesso
  RouterModule.forRoot( routes, { enableTracing: false } );// enableTracing: true is for debugging purposes only

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        routerModuleWithProviders
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule { }

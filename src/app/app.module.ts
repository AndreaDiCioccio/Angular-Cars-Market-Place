import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RoutingModule } from './routing.module';
import { HomeComponent } from './home/home.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './helpers/jwt-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserGalleryComponent } from './user-gallery/user-gallery.component';
import { SellNewCarComponent } from './sell-new-car/sell-new-car.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { BuyCarComponent } from './buy-car/buy-car.component';
import { RecentCarsComponent } from './recent-cars/recent-cars.component';
import { ObservedCarsComponent } from './observed-cars/observed-cars.component';
import { SimilarCarsComponent } from './similar-cars/similar-cars.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryService } from './services/in-memory.service'

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HomeComponent,
    RegisterComponent,
    CarDetailComponent,
    NavbarComponent,
    UserProfileComponent,
    UserPageComponent,
    UserGalleryComponent,
    SellNewCarComponent,
    StarRatingComponent,
    BuyCarComponent,
    RecentCarsComponent,
    ObservedCarsComponent,
    SimilarCarsComponent,
    ErrorMessagesComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    RoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService, { delay: 500 })
  ],
  providers: [
    //CarsService, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //ErrorInterceptor,
    //fakeBackendProvider,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

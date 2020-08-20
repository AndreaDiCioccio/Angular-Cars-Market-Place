import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { first, take } from 'rxjs/operators';
import {Location} from '@angular/common';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { ErrorInterceptor } from '../helpers/error-interceptor';
import { ErrorsService } from '../services/errors.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm: FormGroup;
  //userForm: FormGroup;
  submitted = false;
  returnUrl: string;

  user = new BehaviorSubject<User>(null);
  isLoggedIn:boolean;

  constructor( private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,
    public authenticationService: AuthenticationService,
    private errorsService:ErrorsService
  ){
    
    this.user.next(this.authenticationService.currentUserValue)
 
  
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.authenticationService.logout();
    }
  }   

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.isLoggedIn = this.authenticationService.isLoggedIn();
  
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {

      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(
          take(1)
          ).subscribe({

            next:() => {
              this.user.next(this.authenticationService.currentUserValue);
              this.isLoggedIn = this.authenticationService.isLoggedIn();

            },

            error:error => {
              console.error(error);
              this.errorsService.sendError(error);
              this.errorsService.registerError(error);
            }
          }
      );

    this.router.navigate(['/home']);

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
  
  responsive() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  } 

}

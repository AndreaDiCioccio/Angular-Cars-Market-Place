import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const isExpired = this.authenticationService.isExpired()
        if (currentUser && !isExpired) {
            // authorised so return true
            return true;
        }

        if(isExpired){
            //fare il logout
            if(currentUser)
                this.authenticationService.logout();
            
            //segnalare all' utente che è scaduta la sessione e fare il redirect alla homepage
            alert('La sessione è scaduta, rieffettuare il login');
        }
        //eliminare dopo che è stato implementato il messaggio di errore
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
}
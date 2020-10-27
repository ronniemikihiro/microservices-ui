import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if(this.authService.isTokenExpired()) {
      console.log('Auth Guard ==> Token expired! Getting new Token...');

      this.authService.refreshToken().subscribe(response => {
        this.authService.saveToken(response);
        console.log('Auth Guard ==> New token successfully created...');
        return true;
      }, errorResponse => {
        console.log('Auth Guard ==> Unauthenticated user!');
        this.router.navigate(['/login']);
        return false;
      });

    } else if (next.data.roles && !this.authService.hasAnyRole(next.data.roles)) {
      this.router.navigate(['/unauthorized']);
      return false; 
    }
    
    return true;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (next.data.roles && !this.authService.hasAnyRole(next.data.roles)) {
      this.router.navigate(['/unauthorized']);
      return false; 
    }

    return true;
  }
}

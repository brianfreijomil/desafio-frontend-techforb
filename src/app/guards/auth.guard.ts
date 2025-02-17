import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route:ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {

      const allowedAuthorities: string[] = route.data['authorities'];
      const userAuthorities: string[] = this.authService.getAuthorities(); 

      if (!allowedAuthorities || allowedAuthorities.length === 0) {
        return true;
      }
      const hasAccess = userAuthorities.some(authority => allowedAuthorities.includes(authority));
      if (!hasAccess) {
        this.router.navigate(['/dashboard']);
        return false;
      }

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/sign_in']);
      return false;
    }
  }
}
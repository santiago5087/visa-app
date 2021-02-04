import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router) { }
  
  canActivate() {
    console.log("MY guard", this.authService.isLoggedIn())
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
  
}

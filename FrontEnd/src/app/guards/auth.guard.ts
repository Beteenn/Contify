import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  interval: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // 0 - não registrado  -> null || ""
  // 1- pendente -> INACTIVE
  // 2- registrado -> ACTIVE


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isLogged = this.authService.isLogged;

    if (isLogged) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const currentUser = this.authService.currentUser;

    if (childRoute.data.roles && childRoute.data.roles.indexOf(currentUser.role) === -1) {
      // role not authorised so redirect to home page
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}

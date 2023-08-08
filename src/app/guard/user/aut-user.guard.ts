import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserServiceService } from '../../Services/user/user-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class autUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private userservice: UserServiceService,
   
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.userservice.isLoggedIn()) {
      return true;
    } else {
     
      return this.router.createUrlTree(['/login']);
    }
  }
 
};

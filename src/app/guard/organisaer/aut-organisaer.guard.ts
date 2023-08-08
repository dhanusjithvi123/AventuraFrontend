import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OrganisaersService } from '../../Services/organisaer/organisaers.service';
import { Observable } from 'rxjs';

@Injectable()
export class OrganisaerGuard implements CanActivate {
  constructor(
    private router: Router,
    private organisaersService: OrganisaersService,
   
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.organisaersService.isLoggedIn()) {
      return true;
    } else {
     
      return this.router.createUrlTree(['/organisaerlogin']);
    }
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private auth: UserService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      window.alert(
        'You are not authorized to access this page! please log in.'
      );
      this.router.navigate(['loginuser']);
      return false;
    }
  }
}

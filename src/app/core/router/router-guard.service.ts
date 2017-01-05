import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RouterGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (state.url.startsWith('/login')) {
      return this.canActivateLogin();
    } else {
      return this.canActivateAuthorizedUrl();
    }
  }

  private canActivateAuthorizedUrl() {
    return this.authService.isAuthenticated().map(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
      return isAuthenticated;
    });
  }

  private canActivateLogin() {
    return this.authService.isAuthenticated().map(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/search']);
      }
      return !isAuthenticated;
    });
  }

}

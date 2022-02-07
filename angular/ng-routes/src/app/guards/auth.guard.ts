import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('can activate');
    return this.verifyAccess();
  }

  public canLoad(
    route: Route,
    segments: UrlSegment[],
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('Can load: verify if user can load data');

    return this.verifyAccess();
  }

  private verifyAccess() {
    if (this.authService.userAuthenticated) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

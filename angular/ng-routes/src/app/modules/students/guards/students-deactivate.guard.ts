import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDeactivate } from 'src/app/interfaces/form-deactivate';

@Injectable()
export class StudentsDeactivateGuard implements CanDeactivate<FormDeactivate> {
  canDeactivate(
    component: FormDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('can deactivate');
    return component.canDeactivate();
  }
}

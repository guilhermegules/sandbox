import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public shouldShowMenu = new EventEmitter<boolean>();

  private isAuthenticated = false;

  constructor(private router: Router) {}

  public authorization(user: User) {
    if (user.name === 'user@email.com' && user.password === '123') {
      this.isAuthenticated = true;
      this.router.navigate(['/']);
    } else {
      this.isAuthenticated = false;
    }

    this.shouldShowMenu.emit(this.isAuthenticated);
  }
}

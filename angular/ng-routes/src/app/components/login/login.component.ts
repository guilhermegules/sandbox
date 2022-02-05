import { Component, OnInit } from '@angular/core';

import { User } from '../../classes/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user = new User();

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {}

  public login() {
    console.log(this.user);
    this.authService.authorization(this.user);
  }
}

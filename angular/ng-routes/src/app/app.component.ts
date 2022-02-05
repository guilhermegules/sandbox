import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public shouldShowMenu = false;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.authService.shouldShowMenu.subscribe((shouldShowMenu) => {
      this.shouldShowMenu = shouldShowMenu;
    });
  }
}

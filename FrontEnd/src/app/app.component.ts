import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
  ) { }

  title = 'Contify';

  isLogged() {
    return this.authService.isLogged;
  }

  isHomeOrAbout() {
    var url = window.location.href;
    if (url != 'http://localhost:3001/home' && url != 'http://localhost:3001/about')
      return false;
    return true;
  }

  isDashboard() {
    var url = window.location.href;
    if (url != 'http://localhost:3001/dashboard')
      return false;
    return true;
  }
}

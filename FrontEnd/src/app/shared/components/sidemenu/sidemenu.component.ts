import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SidemenuService } from 'src/app/services/shared/components/sidemenu/sidemenu.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  drawer = document.getElementById('drawer');

  constructor(
    public authService: AuthService,
    private sidemenuService: SidemenuService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}

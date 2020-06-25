import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SidemenuService } from 'src/app/services/shared/components/sidemenu/sidemenu.service';
import { InputComponent } from 'src/app/components/moviment/input/input.component'

// Material
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openMovimentInput() {
    this.dialog.open(InputComponent);
  }

  logout() {
    this.authService.logout();
  }

}

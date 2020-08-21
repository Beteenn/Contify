import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SidemenuService } from 'src/app/services/shared/components/sidemenu/sidemenu.service';
import { InputComponent } from 'src/app/components/moviment/input/input.component'
import { FeedbackComponent } from 'src/app/components/feedback/feedback.component'
import { MovimentService } from 'src/app/services/components/moviments/moviment.service';

// Material
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  option: string = '';

  constructor(
    public authService: AuthService,
    private sidemenuService: SidemenuService,
    public dialog: MatDialog,
    private movimenService: MovimentService,
  ) { }

  ngOnInit(): void {
  }

  newMovimentCredit() {
    this.option = "credit";
    this.openMovimentInput();
  }

  newMovimentDebt() {
    this.option = "debt";
    this.openMovimentInput();
  }

  newMovimentTransfer() {
    this.option = "transfer";
    this.openMovimentInput();
  }

  openMovimentInput() {
    this.dialog.open(InputComponent);
    this.movimenService.selectFunction(this.option);
  }

  sendFeedback() {
    this.dialog.open(FeedbackComponent);
  }

  logout() {
    this.authService.logout();
  }

}

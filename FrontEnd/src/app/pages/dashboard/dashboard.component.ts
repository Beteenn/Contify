import { Component, OnInit } from '@angular/core';
import { MovimentService } from 'src/app/services/components/moviments/moviment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page: number = 1;
  moviments;
  option: string = "all";
  result;
  credit;
  debt;

  constructor(
    private movimentService: MovimentService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getBalance();
    this.getCredit();
    this.getDebt();
    this.getAll();
  }

  getBalance() {
    this.userService.getResult()
      .subscribe(
        result => this.result = Number.parseFloat(JSON.stringify(result['result'])).toFixed(2),
        error => console.log("getResult Deu ruim - ", error),
      );
  }

  getCredit() {
    this.movimentService.getCredit()
      .subscribe(
        credit => this.credit = Number.parseFloat(JSON.stringify(credit)).toFixed(2),
        error => console.log("getCredit Deu ruim - ", error),
      );
  }

  getDebt() {
    this.movimentService.getDebt()
      .subscribe(
        debt => this.debt = Number.parseFloat(JSON.stringify(debt)).toFixed(2),
        error => console.log("getDebt Deu ruim - ", error),
      );
  }

  getAll() {
    this.page = 1;
    this.movimentService.getMoviments(this.page).subscribe((moviments => {
      this.option = "all";
      this.moviments = moviments;
      this.movimentService.setLocalMoviments(this.moviments);
    }));
  }

  getCredits() {
    this.page = 1;
    const type = true;
    this.movimentService.getMovimentsByType(this.page, type).subscribe((moviments => {
      this.option = "credit";
      this.moviments = moviments;
      this.movimentService.setLocalMoviments(this.moviments);
    }));
  }

  getDebts() {
    this.page = 1;
    const type = false;
    this.movimentService.getMovimentsByType(this.page, type).subscribe((moviments => {
      this.option = "debt";
      this.moviments = moviments;
      this.movimentService.setLocalMoviments(this.moviments);
    }));
  }

  loadMore() {
    if(this.moviments.length >= (this.page * 5))
      this.page += 1;
    console.log(this.option, this.page);
    switch (this.option) {
      case "all": {
        this.movimentService.getMoviments(this.page).subscribe((moviments => {
          let verifica = JSON.stringify(moviments);
          console.log(moviments);
          console.log(this.moviments);
          if(verifica != "[]") {
            if(this.moviments != moviments) {
              this.moviments.push(moviments);
            }
          }
          this.movimentService.setLocalMoviments(this.moviments);
        }));
        break
      }
      case "credit": {
        this.getCredits();
        break
      }
      case "debt": {
        this.getDebts();
        break
      }
    }
  }
}

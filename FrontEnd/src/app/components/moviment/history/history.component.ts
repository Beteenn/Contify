import { Component, OnInit } from '@angular/core';
import { MovimentService } from 'src/app/services/components/moviments/moviment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  moviment;
  moviments;

  constructor(
    private movimentService: MovimentService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.moviment = this.getMoviment();
    this.moviments = this.getMoviments();
  }

  getMoviment() {
    return this.movimentService.getCurrentMoviment();
  }

  getMoviments() {
    return this.movimentService.getLocalMoviments();
  }

  deleteMoviment(movimentId) {
    console.log(movimentId);
    this.movimentService.deleteMoviment(movimentId)
      .subscribe(
        success => {
          this._snackBar.open("Movimento excluído com sucesso", "Ok", {
            duration: 2000,
          });
          console.log(success);
          window.location.reload();
        },
        err => {
          this._snackBar.open("Algo deu errado...", "Ok", {
            duration: 2000,
          });
        },
      );
  }

  viewMoviment() {
    this.movimentService.id = this.moviment.id;
    this.dialog.open(EditComponent);
  }
}

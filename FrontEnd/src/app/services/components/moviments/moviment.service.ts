import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MovimentService {

  option: string = '';
  indice: number = 0;
  moviments;
  id: number;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) { }

  getCredit() {
    return this.http.get(environment.apiUrl + 'result/earning');
  }

  getDebt() {
    return this.http.get(environment.apiUrl + 'result/debit');
  }

  getMoviments(page) {
    return this.http.get(environment.apiUrl + 'moviments', { params: { page: page } });
  }

  getMovimentsByType(page, type) {
    return this.http.get(environment.apiUrl + 'moviments/type', { params: { page: page, type: type } });
  }

  getMoviment() {
    return this.http.get(environment.apiUrl + 'moviments/' + this.id);
  }

  selectFunction(option) {
    this.option = option;
  }

  public get movimentOption() { return this.option; };

  newMoviment(name, valor, date, img, category, paid, description, isEarning) {
    if (img != '')
      this.postPicture(name, valor, date, img, category, paid, description, isEarning);
    else
      this.postMoviment(name, valor, date, category, paid, description, isEarning);
  }

  postPicture(name, valor, date, img, category, paid, description, isEarning) {
    const file = img;
    console.log(file);
    return this.http.post(environment.apiUrl + 'picture', file, { headers: { 'Content-Type': 'multipart/form-data' } })
      .pipe(first())
        .subscribe(
          image => {
            console.log("postPicture Success");
            this.postMoviment(name, valor, date, category, paid, description, isEarning);
          },
          error => {
            console.log("postPicture Deu ruim - ", error);
          });
  }

  postMoviment(name, valor, date, category, paid, description, isEarning) {
    const moviment = {
      "name": name,
      "description": description,
      "valor": valor,
      "category_id": category,
      "expires": date,
      "is_earning": isEarning,
      "paid": paid,
    }
    return this.http.post(environment.apiUrl + 'moviments', moviment)
      .pipe(first())
        .subscribe(
          data => {
            console.log("postMoviment Success");
            this.dialog.closeAll();
            window.location.reload();
          },
          error => {
            console.log("postMoviment Deu ruim - ", error);
          });
  }

  updateMoviment(name, valor, date, category, paid, description, isEarning) {
    const moviment = {
      "name": name,
      "description": description,
      "valor": valor,
      "category_id": category,
      "expires": date,
      "is_earning": isEarning,
      "paid": paid,
    }
    return this.http.put(environment.apiUrl + 'moviments/' + this.id, moviment)
      .pipe(first())
        .subscribe(
          data => {
            console.log("putMoviment Success");
            this.dialog.closeAll();
            window.location.reload();
          },
          error => {
            console.log("putMoviment Deu ruim - ", error);
          });
  }

  deleteMoviment(id) {
    return this.http.delete(environment.apiUrl + 'moviments/' + id);
  }

  setLocalMoviments(moviments) {
    this.moviments = moviments;
  }

  getCurrentMoviment() {
    let moviment = this.moviments[this.indice];
    this.indice == (this.moviments.length - 1) ? this.indice = 0 : this.indice++;
    return moviment;
  }

  getLocalMoviments() {
    return this.moviments;
  }

  getCategories() {
    return this.http.get(environment.apiUrl + 'category');
  }
}

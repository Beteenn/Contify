import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {
  token: string = window.location.href.split("/")[4];


  constructor(
    private http: HttpClient,
  ) { }

  forgot(email: string) {
    const data = {
      "email": email
    }
    return this.http.post(environment.apiUrl + "forgot-password", data).pipe(map(data => {
      let response = { ok: data['ok'] };
      return response;
    }));
  }

  reset(password: string) {
    const data = {
      "password" : password,
    }
    return this.http.post(environment.apiUrl + "reset-password/" + this.token, data).pipe(map(data => {
      let response = { ok: data['ok'] };
      return response;
    }))
  }
}

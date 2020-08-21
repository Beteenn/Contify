import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getUsuario() {
    var index = localStorage.getItem('currentUser.user.id');
    return this.http.get<any>(environment.apiUrl + "users" + index);
  };

  postUser(name, email, password) {
    const user = {
      "name": name,
      "email": email,
      "password": password,
    };
    return this.http.post(environment.apiUrl + 'users', user);
  }

  postNovaSenha(email: string) {
    return this.http.post(environment.apiUrl + "apiC/Email/SolicitacaoNovaSenha/" + email + "/", {})
      .subscribe({
        next: data => console.log("next data", data),
        error: error => console.log("usuario não encontrado", error)
      });
  }

  getResult() {
    return this.http.get(environment.apiUrl + "result");
  }
}

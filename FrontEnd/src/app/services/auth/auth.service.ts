import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserInfoSubject: BehaviorSubject<any>;
  public currentUserInfo: Observable<any>;

  private currentUserTokenSubject: BehaviorSubject<any>;
  public currentUserToken: Observable<any>;

  loggedStatus: boolean = false;

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserInfoSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserInfo = this.currentUserInfoSubject.asObservable();

    this.currentUserTokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
    this.currentUserToken = this.currentUserTokenSubject.asObservable();

    if (this.currentUser)
      this.loggedStatus = true;
  }

  login(email: string, password: string) {
    const data = {
      "email": email,
      "password": password,
    }
    return this.http.post(environment.apiUrl + "auth", data)
      .pipe(map(data => {
        this.loggedStatus = true;
        let user = { user: data['user']};
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserInfoSubject.next(user);
        let token = { token: data['token']};
        localStorage.setItem('token', JSON.stringify(token));
        this.currentUserTokenSubject.next(token);
        return token;
      }));
  }

  logout() {
    this.loggedStatus = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserInfoSubject.next(null);
    this.currentUserTokenSubject.next(null);
  }

  public get isLogged() {
    return this.loggedStatus;
  }

  public get currentUser(): any {
    return this.currentUserInfoSubject.value;
  }

  public get currentToken(): any {
    return this.currentUserTokenSubject.value;
  }
}

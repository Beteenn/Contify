import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  loginForm: FormGroup;
  error = '';
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    // redirect to home if already logged in
    if (this.authService.isLogged)
      this.router.navigate(['/dashboard']);

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'É necessário um e-mail';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get f() { return this.loginForm.controls; };

  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Tá dando ruim");
      return;
    }

    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.error = error;
          console.log("LoginPage Error", this.error);
        });
  }


}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  registerForm: FormGroup;
  error = '';
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    // redirect to home if already logged in
    if (this.authService.isLogged)
      this.router.navigate(['/dashboard']);

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.registerForm.controls; };

  getErrorMessage() {
    if (this.email.hasError('required')) {
      console.log(this.email.invalid)
      console.log("ta aqui ainda")
      if (this.f.email.value == "") {
        console.log("ta errado memo")
        return 'Você deve inserir um e-mail';
      }
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  register() {
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.userService.postUser(this.f.name.value, this.f.email.value, this.f.password.value)
      .pipe(first())
        .subscribe(
          data => {
            // Auto login after register
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
          },
        error => {
          this.error = error;
          console.log("LoginPage Error", this.error);
        });
  }

}

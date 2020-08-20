import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPassService } from '../../services/forgot/forgot-pass.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  constructor(
    private forgotService: ForgotPassService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  forgotForm: FormGroup;
  error = '';

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
    })
  }

  get f() { return this.forgotForm.controls; };

  forgotPass() {
    if(this.forgotForm.invalid) {
      console.log('Deu ruim!');
      return;
    }

    this.forgotService.forgot(this.f.email.value).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/forgotpassmessage']);
      },
      error => {
        this.error = error;
        console.log("Forgot page error", this.error)
      }
    )
  }

}

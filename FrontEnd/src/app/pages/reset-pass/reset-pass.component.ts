import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPassService } from '../../services/forgot/forgot-pass.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetpassComponent implements OnInit {

  constructor(
    private forgotService: ForgotPassService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  resetForm: FormGroup;
  hide = true;
  error = '';

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required]
    })
  }

  get f() { return this.resetForm.controls; };

  resetPass() {
    if(this.resetForm.invalid) {
      console.log('Deu ruim!');
      return;
    }

    this.forgotService.reset(this.f.password.value).pipe(first()).subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        this.error = error;
        console.log("Forgot page error", this.error)
      }
    )
  }

}

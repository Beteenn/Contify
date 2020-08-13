import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedbackForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      feedback: ['', Validators.required],
    });
  }

  get f() { return this.feedbackForm.controls; };

  sendFeedback() {
    const feedback = {
      "description": this.f.feedback.value,
    }
    return this.http.post(environment.apiUrl + "feedbacks", feedback)
      .subscribe(
        data => {
          this._snackBar.open("Feedback enviado com sucesso", "Ok", {
            duration: 2000
          });
          this.dialog.closeAll();
        },
        error => {
          this._snackBar.open("Feedback não enviado, algo deu errado...", "Ok", {
            duration: 2000
          });
        }
      );
  }

}

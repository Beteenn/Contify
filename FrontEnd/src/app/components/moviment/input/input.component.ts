import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  expendForm: FormGroup;

  ngOnInit(): void {
    this.expendForm = this.formBuilder.group({
      name: ['', Validators.required],
      valor: ['', Validators.required],
      expires: ['', Validators.required],
      img: '',
      option: '',
      paid: true,
      description: ''
    })
  }

  get f() { return this.expendForm.controls; };

  addMoviment() {
    this.newDebit();
  }

  newDebit() {
    console.log(this.f.name.value, this.f.valor.value, this.f.date.value, this.f.img.value, this.f.option.value, this.f.paid.value, this.f.description.value);
  }

}

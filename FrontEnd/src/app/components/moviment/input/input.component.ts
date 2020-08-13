import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovimentService } from 'src/app/services/components/moviments/moviment.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  categories;
  movimentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public movimentService: MovimentService,
  ) { }

  ngOnInit(): void {
    this.movimentForm = this.formBuilder.group({
      name: ['', Validators.required],
      valor: ['', Validators.required],
      expires: ['', Validators.required],
      img: [''],
      category: [''],
      paid: [true],
      description: [''],
    });
    this.getCategories();
  }

  get f() { return this.movimentForm.controls; };

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files);
      this.movimentForm.get('img').setValue(file);
    }
  }

  addMoviment() {
    switch (this.movimentService.movimentOption) {
      case "credit": {
        this.newCredit();
        break
      }
      case "debt": {
        this.newDebt();
        break
      }
      case "transfer": {
        this.newTransfer();
        break
      }
    }
  }

  newCredit() {
    let isEarning: boolean = true;
    this.movimentService.newMoviment(this.f.name.value, this.f.valor.value, this.f.expires.value, this.f.img.value, this.f.category.value, this.f.paid.value, this.f.description.value, isEarning);
  }

  newDebt() {
    let isEarning: boolean = false;
    this.movimentService.newMoviment(this.f.name.value, this.f.valor.value, this.f.expires.value, this.f.img.value, this.f.category.value, this.f.paid.value, this.f.description.value, isEarning);
  }

  newTransfer() {
    let isEarning: boolean = false;
    this.movimentService.newMoviment(this.f.name.value, this.f.valor.value, this.f.expires.value, this.f.img.value, this.f.category.value, this.f.paid.value, this.f.description.value, isEarning);
  }

  getCategories() {
    this.movimentService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        error => console.log("getCategories Deu ruim - ", error),
      );
  }
}

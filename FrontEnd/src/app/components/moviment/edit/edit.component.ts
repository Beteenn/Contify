import { Component, OnInit } from '@angular/core';
import { MovimentService } from 'src/app/services/components/moviments/moviment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'moviment-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  moviment;
  categories;
  movimentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private movimentService: MovimentService,
  ) { }

  ngOnInit(): void {
    this.getMoviment();
    this.getCategories();
  }

  getMoviment() {
    this.movimentService.getMoviment()
      .subscribe(
        moviment => {
          this.moviment = moviment;
          console.log(this.moviment);
          let date = this.moviment.expires;
          date.split("T");
          console.log(date);
          this.movimentForm = this.formBuilder.group({
            name: [moviment['name'], Validators.required],
            valor: [moviment['valor'], Validators.required],
            expires: [date, Validators.required],
            category: [moviment['category_id']],
            img: [''],
            paid: [moviment['paid']],
            description: [moviment['description']],
          });
          console.log("Deu certo! - ", this.moviment);
        },
        err => {
          console.log("getMoviiment error: ", err);
        },
      )
  }

  get f() { return this.movimentForm.controls; };

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(event.target.files);
      this.movimentForm.get('img').setValue(file);
    }
  }

  getCategories() {
    this.movimentService.getCategories()
      .subscribe(
        categories => this.categories = categories,
        error => console.log("getCategories Deu ruim - ", error),
      );
  }

  updateMoviment() {
    this.movimentService.updateMoviment(this.f.name.value, this.f.valor.value, this.f.expires.value, this.f.category.value, this.f.paid.value, this.f.description.value, this.moviment.is_earning);
  }
}

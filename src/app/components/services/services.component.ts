import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  @Input() formGroupName!: string;
  @Input() vatRate!: number;
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    if (this.form.get('price')) {
      this.form.get('price')?.valueChanges.subscribe;
    }
  }

  onAddService() {
    (<FormArray>this.form.get('services')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]*([.][0-9]{0,2})?$/),
        ]),
      })
    );
  }

  onPriceChange(price: number) {
    if (!price) return null;
    let calculatedPrice = price;
    if (this.vatRate) {
      calculatedPrice = (price * (this.vatRate + 100)) / 100;
    }
    return calculatedPrice.toFixed(2);
  }

  onDeleteService(index: number) {
    (<FormArray>this.form.get('services')).removeAt(index);
  }

  get controls() {
    // console.log(this.form.);

    // a getter!
    return (<FormArray>this.form.get('services')).controls;
  }
}

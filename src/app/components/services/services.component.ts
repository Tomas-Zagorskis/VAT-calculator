import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  @Input() serviceProvider = new FormGroup<any>({});
  @Input() vatRate!: number;

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.serviceProvider.addControl(
      'services',
      new FormArray([
        new FormGroup({
          name: new FormControl('', Validators.required),
          price: new FormControl(0, [
            Validators.required,
            Validators.pattern(/^[0-9]*([.][0-9]{0,2})?$/),
          ]),
        }),
      ])
    );
  }

  onAddService() {
    (<FormArray>this.serviceProvider.get('services')).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        price: new FormControl(0, [
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
    (<FormArray>this.serviceProvider.get('services')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.serviceProvider.get('services')).controls;
  }
}

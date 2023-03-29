import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Country } from 'src/app/models/country.model';
import { CountryRateDTO } from 'src/app/models/vatstackResponse.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  customerDetails = new FormGroup<{
    [key: string]: AbstractControl<string, string>;
  }>({});
  @Input() invoiceForm = new FormGroup({});
  @Input() countries!: (Country | CountryRateDTO)[];

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.invoiceForm.addControl('customerDetails', this.customerDetails);

    this.customerDetails.addControl('VATPayer', new FormControl('private'));
    this.customerDetails.addControl(
      'fName',
      new FormControl('', Validators.required)
    );
    this.customerDetails.addControl(
      'lName',
      new FormControl('', Validators.required)
    );
    this.customerDetails.addControl('company', new FormControl(''));
    this.customerDetails.addControl(
      'email',
      new FormControl('', [Validators.required, Validators.email])
    );
    this.customerDetails.addControl(
      'country',
      new FormControl('', Validators.required)
    );
    this.customerDetails.addControl(
      'city',
      new FormControl('', Validators.required)
    );
    this.customerDetails.addControl(
      'address',
      new FormControl('', Validators.required)
    );
  }
}

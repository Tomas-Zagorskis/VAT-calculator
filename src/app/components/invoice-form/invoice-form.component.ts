import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CountryRateDTO, VatstackResponse } from './vatstackResponse.model';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  countries: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: { name: string } }>(
        'https://restcountries.com/v2/all'
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (Object.prototype.hasOwnProperty.call(responseData, key)) {
              const element = responseData[key];
              this.countries.push(element.name);
            }
          }
        })
      )
      .subscribe();
    this.http
      .get<VatstackResponse>('https://api.vatstack.com/v1/rates')
      .pipe(
        map((responseData) => {
          const countryRates: CountryRateDTO[] = [];
          responseData.rates.forEach((data) => {
            countryRates.push({
              country_code: data.country_code,
              country_name: data.country_name,
              member_state: data.member_state,
              standard_rate: data.standard_rate,
            });
          });
        })
      )
      .subscribe();

    this.invoiceForm = new FormGroup({
      customerDetails: new FormGroup({
        VATPayer: new FormControl('private'),
        fName: new FormControl(null, Validators.required),
        lName: new FormControl(null, Validators.required),
        company: new FormControl(null),
        email: new FormControl(null, [Validators.required, Validators.email]),
        country: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
      }),
      serviceProvider: new FormGroup({
        name: new FormControl(null, Validators.required),
        sCountry: new FormControl(null, Validators.required),
        sCity: new FormControl(null, Validators.required),
        sAddress: new FormControl(null, Validators.required),
        services: new FormArray([
          new FormGroup({
            name: new FormControl(null, Validators.required),
            price: new FormControl(null, [
              Validators.required,
              Validators.pattern(/^[0-9]*([.][0-9]{0,2})?$/),
            ]),
          }),
        ]),
      }),
    });

    // Checks customer for type and adds/removes validation for company name input
    this.invoiceForm
      .get('customerDetails.VATPayer')
      ?.valueChanges.subscribe((val: string) => {
        const company = this.invoiceForm.get('customerDetails.company');
        val === 'business'
          ? company?.addValidators(Validators.required)
          : company?.clearValidators();
        if (val === 'private') company?.setValue(null);
        company?.updateValueAndValidity();
      });
  }

  onSubmit() {
    console.log(this.invoiceForm.value);
  }
}

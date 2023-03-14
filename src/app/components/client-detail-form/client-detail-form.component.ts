import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-client-detail-form',
  templateUrl: './client-detail-form.component.html',
  styleUrls: ['./client-detail-form.component.scss'],
})
export class ClientDetailFormComponent implements OnInit {
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

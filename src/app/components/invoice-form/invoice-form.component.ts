import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryRateDTO } from '../../models/vatstackResponse.model';
import { HttpService } from 'src/app/services/http.service';
import { Country } from 'src/app/models/country.model';
import { Subscription } from 'rxjs';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss'],
})
export class InvoiceFormComponent implements OnInit, OnDestroy {
  invoiceForm!: FormGroup;
  countries: Country[] = [];
  countryRates: CountryRateDTO[] = [];

  countryListSub!: Subscription;
  rateListSub!: Subscription;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.countryListSub = this.httpService
      .getCountryList()
      .subscribe((countries) => (this.countries = [...countries]));

    this.rateListSub = this.httpService
      .getEURates()
      .subscribe((rates) => (this.countryRates = [...rates]));

    this.initForm();

    // Checks customer for type and adds/removes validation for company name input
    this.checkCustomerType();
  }

  onSubmit() {
    console.log(this.invoiceForm.value);
  }

  ngOnDestroy() {
    if (this.countryListSub) this.countryListSub.unsubscribe();
    if (this.rateListSub) this.rateListSub.unsubscribe();
  }

  private initForm() {
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
  }

  private checkCustomerType() {
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
}

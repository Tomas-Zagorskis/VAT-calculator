import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CountryRateDTO } from '../../models/vatstackResponse.model';
import { HttpService } from 'src/app/services/http.service';
import { Country } from 'src/app/models/country.model';
import { debounceTime, Subscription } from 'rxjs';
import { InvoiceForm } from 'src/app/models/form.model';

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
  vatRate: number = 0;
  isSubmitted: boolean = false;

  countryListSub!: Subscription;
  rateListSub!: Subscription;
  vatRateSub!: Subscription;
  clientTypeSub!: Subscription;

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

    this.onChanges();
  }

  onSubmit() {
    this.isSubmitted = true;
  }

  onChanges() {
    this.vatRateSub = this.invoiceForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((form: InvoiceForm) => {
        const customerEUMember = this.countryRates.find(
          (countryData) =>
            countryData.code === form.customerDetails.country &&
            countryData.isEUMember
        );
        if (form.serviceProvider.isVATPayer && customerEUMember) {
          if (form.customerDetails.country === form.serviceProvider.sCountry) {
            this.vatRate = customerEUMember.rate;
          } else if (form.customerDetails.VATPayer === 'private') {
            this.vatRate = customerEUMember.rate;
          } else {
            this.vatRate = 0;
          }
        } else {
          this.vatRate = 0;
        }
      });
  }

  ngOnDestroy() {
    if (this.countryListSub) this.countryListSub.unsubscribe();
    if (this.rateListSub) this.rateListSub.unsubscribe();
    if (this.vatRateSub) this.vatRateSub.unsubscribe();
    if (this.clientTypeSub) this.clientTypeSub.unsubscribe();
  }

  private initForm() {
    this.invoiceForm = new FormGroup({});
  }

  private checkCustomerType() {
    const vatPayerType = this.invoiceForm.get('customerDetails.VATPayer');

    if (vatPayerType) {
      this.clientTypeSub = vatPayerType.valueChanges.subscribe(
        (val: string) => {
          const company = this.invoiceForm.get('customerDetails.company');
          val === 'business'
            ? company?.addValidators(Validators.required)
            : company?.clearValidators();
          if (val === 'private') company?.setValue(null);
          company?.updateValueAndValidity();
        }
      );
    }
  }
}

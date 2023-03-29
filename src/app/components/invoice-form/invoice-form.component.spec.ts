import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { of } from 'rxjs';
import { InvoiceFormComponent } from './invoice-form.component';
import { CountryRateDTO } from '../../models/vatstackResponse.model';
import { Country } from 'src/app/models/country.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { ServiceProviderComponent } from '../service-provider/service-provider.component';
import { ServicesComponent } from '../services/services.component';
import { InvoiceComponent } from '../invoice/invoice.component';

describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  const countryRates: CountryRateDTO[] = [
    { code: 'AT', rate: 20, isEUMember: true, name: 'Austria' },
    { code: 'DE', rate: 19, isEUMember: true, name: 'Germany' },
  ];

  const countries: Country[] = [
    { name: 'Austria', code: 'AT' },
    { name: 'Germany', code: 'DE' },
  ];

  beforeEach(async () => {
    httpServiceSpy = jasmine.createSpyObj('HttpService', [
      'getCountryList',
      'getEURates',
    ]);

    await TestBed.configureTestingModule({
      declarations: [
        InvoiceFormComponent,
        CustomerDetailsComponent,
        ServiceProviderComponent,
        ServicesComponent,
        InvoiceComponent,
      ],
      imports: [ReactiveFormsModule],
      providers: [{ provide: HttpService, useValue: httpServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    httpServiceSpy.getCountryList.and.returnValue(of(countries));
    httpServiceSpy.getEURates.and.returnValue(of(countryRates));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial values', () => {
    expect(component.isSubmitted).toBeFalse();
    expect(component.vatRate).toEqual(0);
    expect(component.countries).toEqual(countries);
    expect(component.countryRates).toEqual(countryRates);
    expect(component.invoiceForm).toBeTruthy();
  });
});

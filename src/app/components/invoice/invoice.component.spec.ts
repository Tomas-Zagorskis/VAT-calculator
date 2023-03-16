import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceComponent } from './invoice.component';
import { CustomerDetails, ServiceProvider } from 'src/app/models/form.model';
import { Country } from 'src/app/models/country.model';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;

    // mock data
    const countries: Country[] = [
      { name: 'Lithuania', code: 'LT' },
      { name: 'Latvia', code: 'LV' },
      { name: 'Estonia', code: 'EE' },
    ];
    const customer: CustomerDetails = {
      fName: 'John',
      lName: 'Doe',
      address: 'Some Address',
      country: 'LT',
      company: '',
      city: 'Kaunas',
      VATPayer: 'private',
      email: 'johndoe@mail.com',
    };
    const service: ServiceProvider = {
      name: 'Service Provider',
      isVATPayer: true,
      sAddress: 'Some Address',
      sCity: 'City',
      sCountry: 'LT',
      services: [
        { name: 'Service 1', price: 100 },
        { name: 'Service 2', price: 200 },
      ],
    };
    const tax = 21;

    component.countries = countries;
    component.customer = customer;
    component.service = service;
    component.tax = tax;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate subtotal, tax total and total', () => {
    expect(component.subtotal).toEqual(300);
    expect(component.taxTotal).toEqual(63);
    expect(component.total).toEqual(363);
  });

  it('should return country name by country code', () => {
    const countryName = component.getCountryName('LT');
    expect(countryName).toEqual('Lithuania');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesComponent } from '../services/services.component';
import { ServiceProviderComponent } from './service-provider.component';

describe('ServiceProviderComponent', () => {
  let component: ServiceProviderComponent;
  let fixture: ComponentFixture<ServiceProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProviderComponent, ServicesComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderComponent);
    component = fixture.componentInstance;

    const invoiceForm = new FormGroup({});
    const serviceProvider = new FormGroup<{
      [key: string]: FormControl<string | null | boolean>;
    }>({
      name: new FormControl('', Validators.required),
      isVATPayer: new FormControl(false),
      sCountry: new FormControl('', Validators.required),
      sCity: new FormControl('', Validators.required),
      sAddress: new FormControl('', Validators.required),
    });

    component.invoiceForm = invoiceForm;
    component.serviceProvider = serviceProvider;
    component.countries = [
      { code: 'DE', name: 'Germany', isEUMember: true, rate: 19 },
    ];
    component.vatRate = 19;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with the expected controls', () => {
    expect(component.serviceProvider.contains('name')).toBe(true);
    expect(component.serviceProvider.contains('isVATPayer')).toBe(true);
    expect(component.serviceProvider.contains('sCountry')).toBe(true);
    expect(component.serviceProvider.contains('sCity')).toBe(true);
    expect(component.serviceProvider.contains('sAddress')).toBe(true);
  });

  it('should display an error message if the name field is empty and touched', () => {
    const nameField = fixture.nativeElement.querySelector(
      '[formControlName="name"]'
    );
    nameField.dispatchEvent(new Event('input'));
    nameField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.invalid-msg');
    expect(errorMessage.textContent).toContain('This field is required!');
  });

  it('should display an error message if the sCountry field is empty and touched', () => {
    const sCountryField = fixture.nativeElement.querySelector(
      '[formControlName="sCountry"]'
    );
    sCountryField.dispatchEvent(new Event('change'));
    sCountryField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.invalid-msg');
    expect(errorMessage.textContent).toContain('This field is required!');
  });

  it('should display an error message if the sCity field is empty and touched', () => {
    const sCityField = fixture.nativeElement.querySelector(
      '[formControlName="sCity"]'
    );
    sCityField.dispatchEvent(new Event('input'));
    sCityField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.invalid-msg');
    expect(errorMessage.textContent).toContain('This field is required!');
  });

  it('should display an error message if the sAddress field is empty and touched', () => {
    const sAddressField = fixture.nativeElement.querySelector(
      '[formControlName="sAddress"]'
    );
    sAddressField.dispatchEvent(new Event('input'));
    sAddressField.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.invalid-msg');
    expect(errorMessage.textContent).toContain('This field is required!');
  });
});

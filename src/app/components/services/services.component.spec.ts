import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ServicesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    component.vatRate = 10; // Set VAT rate for tests
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new service to the form', () => {
    const initialLength = component.controls.length;
    component.onAddService();
    const newLength = component.controls.length;
    expect(newLength).toEqual(initialLength + 1);
  });

  it('should delete a service from the form', () => {
    const initialLength = component.controls.length;
    component.onDeleteService(0);
    const newLength = component.controls.length;
    expect(newLength).toEqual(initialLength - 1);
  });

  it('should calculate price including VAT', () => {
    const price = 100;
    const calculatedPrice = component.onPriceChange(price);
    expect(calculatedPrice).toEqual('110.00');
  });

  it('should validate service name as required', () => {
    const control = component.controls[0].get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    control?.setValue('Test Service');
    expect(control?.valid).toBeTruthy();
  });

  it('should validate service price as required and with pattern', () => {
    const control = component.controls[0].get('price');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    control?.setValue('invalid');
    expect(control?.valid).toBeFalsy();
    control?.setValue(0);
    expect(control?.valid).toBeTruthy();
    control?.setValue(10.555);
    expect(control?.valid).toBeFalsy();
    control?.setValue(10.55);
    expect(control?.valid).toBeTruthy();
  });

  it('should disable "Add Service" button if form is invalid', () => {
    component.serviceProvider.setErrors({ invalid: true });
    fixture.detectChanges();
    const addButton = fixture.nativeElement.querySelector('button.btn-success');
    expect(addButton.disabled).toBeTruthy();
  });
});

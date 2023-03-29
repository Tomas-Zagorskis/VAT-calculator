import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details.component';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailsComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid if required fields are not filled out', () => {
    const form = component.customerDetails;
    const fName = form.controls['fName'];
    const lName = form.controls['lName'];
    const email = form.controls['email'];
    const country = form.controls['country'];
    const city = form.controls['city'];
    const address = form.controls['address'];
    const vatPayer = form.controls['VATPayer'];

    fName.setValue('');
    lName.setValue('');
    email.setValue('');
    country.setValue('');
    city.setValue('');
    address.setValue('');
    vatPayer.setValue('private');

    expect(form.valid).toBe(false);
    expect(fName.valid).toBe(false);
    expect(lName.valid).toBe(false);
    expect(email.valid).toBe(false);
    expect(country.valid).toBe(false);
    expect(city.valid).toBe(false);
    expect(address.valid).toBe(false);
    expect(vatPayer.valid).toBe(true); // this field is optional, should still pass
  });

  it('should mark the form as valid if all required fields are filled out', () => {
    const form = component.customerDetails;
    const fName = form.controls['fName'];
    const lName = form.controls['lName'];
    const email = form.controls['email'];
    const country = form.controls['country'];
    const city = form.controls['city'];
    const address = form.controls['address'];
    const vatPayer = form.controls['VATPayer'];

    fName.setValue('John');
    lName.setValue('Doe');
    email.setValue('johndoe@example.com');
    country.setValue('US');
    city.setValue('New York');
    address.setValue('123 Main St');
    vatPayer.setValue('private');

    expect(form.valid).toBe(true);
    expect(fName.valid).toBe(true);
    expect(lName.valid).toBe(true);
    expect(email.valid).toBe(true);
    expect(country.valid).toBe(true);
    expect(city.valid).toBe(true);
    expect(address.valid).toBe(true);
    expect(vatPayer.valid).toBe(true);
  });
});

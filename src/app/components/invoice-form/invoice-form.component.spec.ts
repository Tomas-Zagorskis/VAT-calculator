import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ServiceProviderComponent } from '../service-provider/service-provider.component';
import { ServicesComponent } from '../services/services.component';

import { InvoiceFormComponent } from './invoice-form.component';

describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InvoiceFormComponent,
        CustomerDetailsComponent,
        ServiceProviderComponent,
        ServicesComponent,
        InvoiceComponent,
      ],
      providers: [HttpClient, HttpHandler, FormGroupDirective],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

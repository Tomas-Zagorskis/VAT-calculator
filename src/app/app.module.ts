import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ServiceProviderComponent } from './components/service-provider/service-provider.component';
import { ServicesComponent } from './components/services/services.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    InvoiceComponent,
    ServiceProviderComponent,
    CustomerDetailsComponent,
    ServicesComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

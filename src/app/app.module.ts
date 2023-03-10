import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ClientDetailFormComponent } from './components/client-detail-form/client-detail-form.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-list/product-item/product-item.component';

@NgModule({
  declarations: [AppComponent, ClientDetailFormComponent, InvoiceComponent, ProductListComponent, ProductItemComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

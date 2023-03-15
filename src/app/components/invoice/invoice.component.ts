import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { CustomerDetails, ServiceProvider } from 'src/app/models/form.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @Input() customer!: CustomerDetails;
  @Input() service!: ServiceProvider;
  @Input() tax!: number;
  @Input() countries!: Country[];

  subtotal: number = 0;
  taxTotal: number = 0;
  total: number = 0;

  today: number = Date.now();

  ngOnInit() {
    this.service.services.forEach((serv) => {
      this.subtotal += serv.price;
    });
    this.taxTotal = (this.subtotal * this.tax) / 100;
    this.total = this.subtotal + this.taxTotal;
  }

  getCountryName(code: string) {
    let country = this.countries.find((country) => country.code === code);
    if (country) {
      return country.name;
    }
    return null;
  }
}

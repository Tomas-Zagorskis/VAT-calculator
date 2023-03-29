import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryRateDTO } from 'src/app/models/vatstackResponse.model';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss'],
})
export class ServiceProviderComponent implements OnInit {
  serviceProvider = new FormGroup<{
    [key: string]: FormControl<string | null | boolean>;
  }>({});
  @Input() invoiceForm = new FormGroup({});
  @Input() countries!: CountryRateDTO[];
  @Input() vatRate!: number;

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.invoiceForm.addControl('serviceProvider', this.serviceProvider);

    this.serviceProvider.addControl(
      'name',
      new FormControl('', Validators.required)
    );
    this.serviceProvider.addControl('isVATPayer', new FormControl(false));
    this.serviceProvider.addControl(
      'sCountry',
      new FormControl('', Validators.required)
    );
    this.serviceProvider.addControl(
      'sCity',
      new FormControl('', Validators.required)
    );
    this.serviceProvider.addControl(
      'sAddress',
      new FormControl('', Validators.required)
    );
  }
}

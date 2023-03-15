import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { CountryRateDTO } from 'src/app/models/vatstackResponse.model';

@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss'],
})
export class ServiceProviderComponent implements OnInit {
  @Input() formGroupName!: string;
  @Input() countries!: CountryRateDTO[];
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
  }
}

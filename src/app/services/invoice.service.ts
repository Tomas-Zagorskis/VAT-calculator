import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  CountryRateDTO,
  VatstackResponse,
} from '../models/vatstackResponse.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  getCountryList() {
    return this.http
      .get<{ [key: string]: { name: string; alpha2Code: string } }>(
        'https://restcountries.com/v2/all'
      )
      .pipe(
        map((responseData) => {
          const countries = [];
          for (const key in responseData) {
            if (Object.prototype.hasOwnProperty.call(responseData, key)) {
              const element = responseData[key];
              countries.push({ name: element.name, code: element.alpha2Code });
            }
          }
          return countries;
        })
      );
  }

  getEURates() {
    return this.http
      .get<VatstackResponse>('https://api.vatstack.com/v1/rates')
      .pipe(
        map((responseData) => {
          const countryRates: CountryRateDTO[] = [];
          responseData.rates.forEach((data) => {
            countryRates.push({
              code: data.country_code,
              name: data.country_name,
              isEUMember: data.member_state,
              rate: data.standard_rate,
            });
          });
          return countryRates;
        })
      );
  }
}

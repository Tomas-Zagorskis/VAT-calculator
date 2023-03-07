import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-client-detail-form',
  templateUrl: './client-detail-form.component.html',
  styleUrls: ['./client-detail-form.component.scss'],
})
export class ClientDetailFormComponent implements OnInit {
  clientForm!: FormGroup;
  countries: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ [key: string]: { name: string } }>(
        'https://restcountries.com/v2/all'
      )
      .pipe(
        map((responseData) => {
          for (const key in responseData) {
            if (Object.prototype.hasOwnProperty.call(responseData, key)) {
              const element = responseData[key];
              this.countries.push(element.name);
            }
          }
        })
      )
      .subscribe();
    console.log(this.countries);

    this.clientForm = new FormGroup({
      isVATPayer: new FormControl('private'),
      fName: new FormControl(null, Validators.required),
      lName: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    console.log(this.clientForm.value);
  }
}

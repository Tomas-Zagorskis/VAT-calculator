import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientDetailFormComponent } from './components/client-detail-form/client-detail-form.component';

@NgModule({
  declarations: [AppComponent, ClientDetailFormComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

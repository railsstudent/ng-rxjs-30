import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StripeModule } from './stripe';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StripeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

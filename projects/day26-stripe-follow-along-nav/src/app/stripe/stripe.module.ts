import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StripeNavPageComponent } from './stripe-nav-page/stripe-nav-page.component';
import { StripeCardComponent } from './stripe-card/stripe-card.component';

@NgModule({
  declarations: [
    StripeNavPageComponent,
    StripeCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripeNavPageComponent
  ]
})
export class StripeModule { }

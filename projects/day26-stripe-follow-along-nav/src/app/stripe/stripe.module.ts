import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoolLinkDirective } from './directives/cool-link.directive';
import { StripeCardComponent } from './stripe-card/stripe-card.component';
import { StripeNavPageComponent } from './stripe-nav-page/stripe-nav-page.component';

@NgModule({
  declarations: [
    StripeNavPageComponent,
    StripeCardComponent,
    CoolLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StripeNavPageComponent
  ]
})
export class StripeModule { }

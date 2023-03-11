import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoolLinkDirective } from './directives/cool-link.directive';
import { StripeNavPageComponent } from './stripe-nav-page/stripe-nav-page.component';

@NgModule({
  declarations: [StripeNavPageComponent, CoolLinkDirective],
  imports: [CommonModule],
  exports: [StripeNavPageComponent],
})
export class StripeModule {}

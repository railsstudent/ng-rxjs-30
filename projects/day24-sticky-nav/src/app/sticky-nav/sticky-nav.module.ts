import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyNavPageComponent } from './sticky-nav-page/sticky-nav-page.component';

@NgModule({
  declarations: [
    StickyNavPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StickyNavPageComponent
  ]
})
export class StickyNavModule { }

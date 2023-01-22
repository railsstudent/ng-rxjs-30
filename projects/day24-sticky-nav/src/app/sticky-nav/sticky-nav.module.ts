import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickNavContentComponent } from './stick-nav-content/stick-nav-content.component';
import { StickNavHeaderComponent } from './stick-nav-header/stick-nav-header.component';
import { StickyNavPageComponent } from './sticky-nav-page/sticky-nav-page.component';

@NgModule({
  declarations: [
    StickyNavPageComponent,
    StickNavHeaderComponent,
    StickNavContentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StickyNavPageComponent
  ]
})
export class StickyNavModule { }

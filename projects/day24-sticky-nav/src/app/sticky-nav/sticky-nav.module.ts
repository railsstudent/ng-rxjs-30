import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StickyNavContentComponent } from './sticky-nav-content/sticky-nav-content.component';
import { StickyNavHeaderComponent } from './sticky-nav-header/sticky-nav-header.component';
import { StickyNavPageComponent } from './sticky-nav-page/sticky-nav-page.component';

@NgModule({
  declarations: [StickyNavPageComponent, StickyNavHeaderComponent, StickyNavContentComponent],
  imports: [CommonModule],
  exports: [StickyNavPageComponent],
})
export class StickyNavModule {}

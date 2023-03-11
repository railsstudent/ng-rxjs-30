import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollComponent } from './scroll/scroll.component';

@NgModule({
  declarations: [ScrollComponent],
  imports: [CommonModule],
  exports: [ScrollComponent],
})
export class ScrollModule {}

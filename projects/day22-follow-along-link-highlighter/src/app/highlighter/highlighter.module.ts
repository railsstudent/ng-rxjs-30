import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlighterPageComponent } from './highlighter-page/highlighter-page.component';

@NgModule({
  declarations: [
    HighlighterPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlighterPageComponent
  ]
})
export class HighlighterModule { }

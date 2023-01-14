import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightAnchorDirective } from './directives/highlight-anchor.directive';
import { HighlighterPageComponent } from './highlighter-page/highlighter-page.component';

@NgModule({
  declarations: [
    HighlighterPageComponent,
    HighlightAnchorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlighterPageComponent
  ]
})
export class HighlighterModule { }

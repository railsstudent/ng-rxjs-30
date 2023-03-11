import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightAnchorDirective } from './directives/highlight-anchor.directive';
import { HighlighterContentComponent } from './highlighter-content/highlighter-content.component';
import { HighlighterMenuComponent } from './highlighter-menu/highlighter-menu.component';
import { HighlighterPageComponent } from './highlighter-page/highlighter-page.component';

@NgModule({
  declarations: [
    HighlighterPageComponent,
    HighlightAnchorDirective,
    HighlighterMenuComponent,
    HighlighterContentComponent,
  ],
  imports: [CommonModule],
  exports: [HighlighterPageComponent],
})
export class HighlighterModule {}

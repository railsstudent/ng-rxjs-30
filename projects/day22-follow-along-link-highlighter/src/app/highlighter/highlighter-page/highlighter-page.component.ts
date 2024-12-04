import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HighlighterService } from '../services/highlighter.service';

@Component({
    selector: 'app-highlighter-page',
    template: `
    <ng-container>
      <app-highlighter-menu></app-highlighter-menu>
      <app-highlighter-content></app-highlighter-content>
      <ng-container *ngIf="highlightStyle$ | async as hls">
        <span class="highlight" [ngStyle]="hls"></span>
      </ng-container>
    </ng-container>
  `,
    styles: [
        `
      :host {
        display: block;
      }

      .highlight {
        transition: all 0.2s;
        border-bottom: 2px solid white;
        position: absolute;
        top: 0;
        background: white;
        left: 0;
        z-index: -1;
        border-radius: 20px;
        display: block;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HighlighterPageComponent {
  highlightStyle$ = this.highlighterService.highlighterStyle$;

  constructor(private highlighterService: HighlighterService) {}
}

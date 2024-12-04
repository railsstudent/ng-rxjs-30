import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WINDOW } from '../../core';
import { HighlightAnchorDirective } from '../directives/highlight-anchor.directive';
import { createMouseEnterStream } from '../helpers/mouseenter-stream.helper';
import { HighlighterService } from '../services/highlighter.service';

@Component({
    selector: 'app-highlighter-content',
    template: `
    <div class="wrapper">
      <p>
        Lorem ipsum dolor sit amet, <a href="">consectetur</a> adipisicing elit. Est <a href="">explicabo</a> unde natus
        necessitatibus esse obcaecati distinctio, aut itaque, qui vitae!
      </p>
      <p>
        Aspernatur sapiente quae sint <a href="">soluta</a> modi, atque praesentium laborum pariatur earum
        <a href="">quaerat</a> cupiditate consequuntur facilis ullam dignissimos, aperiam quam veniam.
      </p>
      <p>
        Cum ipsam quod, incidunt sit ex <a href="">tempore</a> placeat maxime <a href="">corrupti</a> possimus
        <a href="">veritatis</a> ipsum fugit recusandae est doloremque? Hic, <a href="">quibusdam</a>, nulla.
      </p>
      <p>
        Esse quibusdam, ad, ducimus cupiditate <a href="">nulla</a>, quae magni odit <a href="">totam</a> ut consequatur
        eveniet sunt quam provident sapiente dicta neque quod.
      </p>
      <p>
        Aliquam <a href="">dicta</a> sequi culpa fugiat <a href="">consequuntur</a> pariatur optio ad minima, maxime
        <a href="">odio</a>, distinctio magni impedit tempore enim repellendus <a href="">repudiandae</a> quas!
      </p>
    </div>
  `,
    styles: [
        `
      :host {
        display: block;
      }

      .wrapper {
        margin: 0 auto;
        max-width: 500px;
        font-size: 20px;
        line-height: 2;
        position: relative;
      }

      a {
        text-decoration: none;
        color: black;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 20px;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HighlighterContentComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(HighlightAnchorDirective)
  anchors!: QueryList<HighlightAnchorDirective>;

  subscription!: Subscription;

  constructor(private highlighterService: HighlighterService, @Inject(WINDOW) private window: Window) {}

  ngAfterViewInit(): void {
    this.subscription = createMouseEnterStream(this.anchors, this.window).subscribe((style) =>
      this.highlighterService.updateStyle(style),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

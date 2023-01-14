import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { Subscription, fromEvent, map, merge } from 'rxjs';
import { HighlightAnchorDirective } from '../directives/highlight-anchor.directive';
import { HighlighterService } from '../services/highlighter.service';

@Component({
  selector: 'app-highlighter-content',
  template: `
    <div class="wrapper">
      <p>Lorem ipsum dolor sit amet, <a href="">consectetur</a> adipisicing elit. Est <a href="">explicabo</a> unde natus necessitatibus esse obcaecati distinctio, aut itaque, qui vitae!</p>
      <p>Aspernatur sapiente quae sint <a href="">soluta</a> modi, atque praesentium laborum pariatur earum <a href="">quaerat</a> cupiditate consequuntur facilis ullam dignissimos, aperiam quam veniam.</p>
      <p>Cum ipsam quod, incidunt sit ex <a href="">tempore</a> placeat maxime <a href="">corrupti</a> possimus <a href="">veritatis</a> ipsum fugit recusandae est doloremque? Hic, <a href="">quibusdam</a>, nulla.</p>
      <p>Esse quibusdam, ad, ducimus cupiditate <a href="">nulla</a>, quae magni odit <a href="">totam</a> ut consequatur eveniet sunt quam provident sapiente dicta neque quod.</p>
      <p>Aliquam <a href="">dicta</a> sequi culpa fugiat <a href="">consequuntur</a> pariatur optio ad minima, maxime <a href="">odio</a>, distinctio magni impedit tempore enim repellendus <a href="">repudiandae</a> quas!</p>
    </div>
  `,
  styles: [`
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
      background: rgba(0,0,0,0.05);
      border-radius: 20px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlighterContentComponent implements AfterViewInit, OnDestroy {

  @ViewChildren(HighlightAnchorDirective)
  anchors!: QueryList<HighlightAnchorDirective>;

  subscription!: Subscription;

  constructor(private highlighterService: HighlighterService) { }

  ngAfterViewInit(): void {
    const mouseEnterArray$ = this.anchors.map(({ nativeElement }) => {
      return fromEvent(nativeElement, 'mouseenter')
        .pipe(
          map(() => {
            const linkCoords = nativeElement.getBoundingClientRect();
            return {
              width: linkCoords.width,
              height: linkCoords.height,
              top: linkCoords.top + window.scrollY,
              left: linkCoords.left + window.scrollX
            };
          }),
        );
    });

    this.subscription = merge(...mouseEnterArray$)
      .pipe(
        map((coords) => ({
          width: `${coords.width}px`,
          height: `${coords.height}px`,
          transform: `translate(${coords.left}px, ${coords.top}px)`
        })),
      )
      .subscribe((style) => this.highlighterService.updateStyle(style));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

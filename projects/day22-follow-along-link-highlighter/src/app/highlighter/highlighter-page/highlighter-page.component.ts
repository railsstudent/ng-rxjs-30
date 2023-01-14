import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, ViewChildren, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription, fromEvent, map, merge } from 'rxjs';
import { HighlightAnchorDirective } from '../directives/highlight-anchor.directive';
import { HighlighterStyle } from '../highlighter.interface';

@Component({
  selector: 'app-highlighter-page',
  template: `
  <ng-container>    
    <nav>
      <ul class="menu">
        <li><a href="">Home</a></li>
        <li><a href="">Order Status</a></li>
        <li><a href="">Tweets</a></li>
        <li><a href="">Read Our History</a></li>
        <li><a href="">Contact Us</a></li>
      </ul>
    </nav>
    <div class="wrapper">
      <p>Lorem ipsum dolor sit amet, <a href="">consectetur</a> adipisicing elit. Est <a href="">explicabo</a> unde natus necessitatibus esse obcaecati distinctio, aut itaque, qui vitae!</p>
      <p>Aspernatur sapiente quae sint <a href="">soluta</a> modi, atque praesentium laborum pariatur earum <a href="">quaerat</a> cupiditate consequuntur facilis ullam dignissimos, aperiam quam veniam.</p>
      <p>Cum ipsam quod, incidunt sit ex <a href="">tempore</a> placeat maxime <a href="">corrupti</a> possimus <a href="">veritatis</a> ipsum fugit recusandae est doloremque? Hic, <a href="">quibusdam</a>, nulla.</p>
      <p>Esse quibusdam, ad, ducimus cupiditate <a href="">nulla</a>, quae magni odit <a href="">totam</a> ut consequatur eveniet sunt quam provident sapiente dicta neque quod.</p>
      <p>Aliquam <a href="">dicta</a> sequi culpa fugiat <a href="">consequuntur</a> pariatur optio ad minima, maxime <a href="">odio</a>, distinctio magni impedit tempore enim repellendus <a href="">repudiandae</a> quas!</p>
    </div>
    <span class="highlight" [ngStyle]="{ 
      width: highlightStyle?.width || '0', 
      height: highlightStyle?.height || '0', 
      transform: highlightStyle?.transform || ''
    }"></span>
  </ng-container>`,
  styleUrls: ['./highlighter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlighterPageComponent implements AfterViewInit, OnDestroy {

  @ViewChildren(HighlightAnchorDirective)
  anchors!: QueryList<HighlightAnchorDirective>;

  highlightStyle: HighlighterStyle | undefined;

  subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef) {}

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
      .subscribe((v) => { 
        this.highlightStyle = v;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

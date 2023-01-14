import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, fromEvent, map, merge, startWith } from 'rxjs';
import { HighlighterService } from '../services/highlighter.service';

@Component({
  selector: 'app-highlighter-menu',
  template: `
    <nav>
      <ul class="menu">
        <li><a href="" #home>Home</a></li>
        <li><a href="" #order>Order Status</a></li>
        <li><a href="" #tweet>Tweets</a></li>
        <li><a href="" #history>Read Our History</a></li>
        <li><a href="" #contact>Contact Us</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }

    .menu {
      padding: 0;
      display: flex;
      list-style: none;
      justify-content: center;
      margin:100px 0;
    }
  
    .menu a {
      display: inline-block;
      padding: 5px;
      margin: 0 20px;
      color: black;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlighterMenuComponent implements OnInit, OnDestroy {
  @ViewChild('home', { static: true, read: ElementRef })
  home!: ElementRef<HTMLAnchorElement>;

  @ViewChild('order', { static: true, read: ElementRef })
  order!: ElementRef<HTMLAnchorElement>;

  @ViewChild('tweet', { static: true, read: ElementRef })
  tweet!: ElementRef<HTMLAnchorElement>;

  @ViewChild('history', { static: true, read: ElementRef })
  history!: ElementRef<HTMLAnchorElement>;

  @ViewChild('contact', { static: true, read: ElementRef })
  contact!: ElementRef<HTMLAnchorElement>;

  subscription!: Subscription;

  constructor(private highlighterService: HighlighterService) {}

  ngOnInit(): void {
    this.subscription = this.createMouseEnterStream(this.home, this.order, this.tweet, this.history, this.contact)
      .pipe(
        startWith({
          width: '0px',
          height: '0px',
          transform: ''
        })
      ).subscribe((style) => this.highlighterService.updateStyle(style));
  }

  createMouseEnterStream(...elementRefs: ElementRef<HTMLAnchorElement>[]) {
    const mouseEnter$ = elementRefs.map(({ nativeElement }) => 
      fromEvent(nativeElement, 'mouseenter')
        .pipe(
          map(() => {
            const linkCoords = nativeElement.getBoundingClientRect();
            return {
              width: linkCoords.width,
              height: linkCoords.height,
              top: linkCoords.top + window.scrollY,
              left: linkCoords.left + window.scrollX
            };
          })
        ));

    return merge(...mouseEnter$)
      .pipe(
        map((coords) => ({
          width: `${coords.width}px`,
          height: `${coords.height}px`,
          transform: `translate(${coords.left}px, ${coords.top}px)`
        }))  
      );    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

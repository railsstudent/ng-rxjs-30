import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WINDOW } from '../../core';
import { createMouseEnterStream } from '../helpers/mouseenter-stream.helper';
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
  styles: [
    `
      :host {
        display: block;
      }

      .menu {
        padding: 0;
        display: flex;
        list-style: none;
        justify-content: center;
        margin: 100px 0;
      }

      .menu a {
        display: inline-block;
        padding: 5px;
        margin: 0 20px;
        color: black;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private highlighterService: HighlighterService,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {
    this.subscription = createMouseEnterStream(
      [this.home, this.order, this.tweet, this.history, this.contact],
      this.window,
    ).subscribe((style) => this.highlighterService.updateStyle(style));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

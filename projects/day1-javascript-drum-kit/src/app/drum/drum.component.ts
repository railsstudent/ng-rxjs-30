import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, map, Subscription } from 'rxjs';
import { WINDOW } from '../core';
import { DrumService } from '../services';
import { ENTRIES } from './drum.constant';

@Component({
  selector: 'app-drum',
  template: `
    <div class="keys">
      <app-drum-key *ngFor="let entry of entries" [entry]="entry" class="key"></app-drum-key>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;

      background-size: cover;
      background-position-x: center;
      background-position-y: bottom;
    }

    div.keys {
      max-width: 100%;
      display: inline-flex;

      .key {
        flex: 1;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  entries = ENTRIES;

  constructor(private hostElement: ElementRef<HTMLElement>,
    private drumService: DrumService,
    @Inject(APP_BASE_HREF) private baseHref: string,
    @Inject(WINDOW) private window: Window,
  ) {}

  ngOnInit(): void {
    const allowedKeys = this.entries.map(entry => entry.key)
    this.subscription = fromEvent(this.window, 'keydown')
      .pipe(
        filter(evt => evt instanceof KeyboardEvent),
        map(evt => evt as KeyboardEvent),
        map(({ key }) => key.toUpperCase()),
        filter(key => allowedKeys.includes(key)),
      )
      .subscribe((key) => this.drumService.playSound(key));

    this.hostElement.nativeElement.style.backgroundImage = this.imageUrl;
  }

  get imageUrl() {
    const isEndWithSlash = this.baseHref.endsWith('/');
    const image =  `${this.baseHref}${ isEndWithSlash ? '' : '/' }assets/images/background.jpg`;
    return `url('${image}')`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

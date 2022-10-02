import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';
import { DrumService } from '../services';
import { ENTRIES } from './drum.constant';

@Component({
  selector: 'app-drum',
  template: `
    <div class="keys">
      <app-drum-key *ngFor="let entry of entries" [entry]="entry" class="key"></app-drum-key>
    </div>
  `,
  styleUrls: ['./drum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  entries = ENTRIES;

  constructor(private hostElement: ElementRef, private drumService: DrumService, @Inject(APP_BASE_HREF) private baseHref: string) {}

  ngOnInit(): void {
    const allowedKeys = this.entries.map(entry => entry.key)
    this.subscription = fromEvent(window, 'keydown')
      .pipe(
        filter(evt => evt instanceof KeyboardEvent),
        map(evt => evt as KeyboardEvent),
        map(({ key }) => key.toUpperCase()),
        filter(key => allowedKeys.includes(key)),
        tap(key => this.drumService.playSound(key))
      )
      .subscribe();

    this.hostElement.nativeElement.style['background-image'] = this.imageUrl;
  }

  get imageUrl() {
    const isEndWithSlash = this.baseHref.endsWith('/');
    const image =  `${this.baseHref}${ isEndWithSlash ? '' : '/' }assets/images/background.jpg`; 
    return `url('${image}')`;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

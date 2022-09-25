import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';
import { Key } from '../interfaces';
import { DrumService } from '../services';

@Component({
  selector: 'app-drum',
  template: `
    <div class="container" [ngStyle]="{ 'background-image': imageUrl }">
      <div class="keys">
        <ng-container *ngFor="let entry of entries">
          <app-drum-key [entry]="entry" class="key"></app-drum-key>
        </ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./drum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  entries: Key[] = [
    {
      key: 'A',
      description: 'clap'
    },
    {
      key: 'S',
      description: 'hihat'
    },
    {
      key: 'D',
      description: 'kick'
    },
    {
      key: 'F',
      description: 'openhat'
    },
    {
      key: 'G',
      description: 'boom'
    },
    {
      key: 'H',
      description: 'ride'
    },
    {
      key: 'J',
      description: 'snare'
    },
    {
      key: 'K',
      description: 'tom'
    },
    {
      key: 'L',
      description: 'tink'
    }
  ]

  constructor(private drumService: DrumService, @Inject(APP_BASE_HREF) private baseHref: string) {}

  ngOnInit(): void {
    const allowedKeys = this.entries.map(entry => entry.key)
    this.subscription = fromEvent(window, 'keydown')
      .pipe(
        filter(evt => evt instanceof KeyboardEvent),
        map(evt => evt as KeyboardEvent),
        filter(({ key }) => allowedKeys.includes(key.toUpperCase())),
        map(({ key }) => key.toUpperCase()),
        tap(key => this.drumService.playSound(key))
      )
      .subscribe();
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

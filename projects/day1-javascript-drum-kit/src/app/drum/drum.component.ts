import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';
import { Key } from '../interfaces';

@Component({
  selector: 'app-drum',
  templateUrl: './drum.component.html',
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

  ngOnInit(): void {
    const allowedKeys = this.entries.map(entry => entry.key)
    this.subscription = fromEvent(window, 'keydown')
      .pipe(
        filter(evt => evt instanceof KeyboardEvent),
        map(evt => evt as KeyboardEvent),
        filter(({ key }) => allowedKeys.includes(key.toUpperCase())),
        tap(value => console.log(value)))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

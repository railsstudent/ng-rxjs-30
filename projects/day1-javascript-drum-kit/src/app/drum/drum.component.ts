import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
import { WINDOW } from '../core/services';
import { DrumKeyComponent } from '../drum-key';
import { getFullAssetPath, getHostNativeElement } from '../helpers';
import { DrumService } from '../services';

const getImageUrl = () => {
  const imageUrl = `${getFullAssetPath()}images/background.jpg`;
  return `url('${imageUrl}')`;
};

const getEntryStore = () => {
  const getEntryStore = inject(DrumService);
  return getEntryStore.getEntryStore();
};

const windowKeydownSubscription = () => {
  const drumService = inject(DrumService);
  const allowedKeys = getEntryStore().allowedKeys;
  return fromEvent(inject<Window>(WINDOW), 'keydown')
    .pipe(
      filter((evt) => evt instanceof KeyboardEvent),
      map((evt) => evt as KeyboardEvent),
      map(({ key }) => key.toUpperCase()),
      filter((key) => allowedKeys.includes(key)),
    )
    .subscribe((key) => drumService.playSound(key));
};

@Component({
    imports: [NgFor, DrumKeyComponent],
    selector: 'app-drum',
    template: `
    <div class="keys">
      <app-drum-key
        *ngFor="let entry of entries"
        [entry]="entry"
        class="key"
      ></app-drum-key>
    </div>
  `,
    styles: [
        `
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
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumComponent implements OnInit, OnDestroy {
  entries = getEntryStore().entries;
  hostElement = getHostNativeElement();
  imageUrl = getImageUrl();
  subscription = windowKeydownSubscription();

  ngOnInit(): void {
    this.hostElement.style.backgroundImage = this.imageUrl;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

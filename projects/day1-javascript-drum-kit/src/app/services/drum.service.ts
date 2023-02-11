import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Key } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  private readonly playDrumKey = new Subject<string>();
  readonly playDrumKey$ = this.playDrumKey.asObservable();

  playSound(key: string) {
    this.playDrumKey.next(key);
  }

  getEntryStore() {
    const entries: Key[] = [
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
    ];

    return {
      entries,
      allowedKeys: entries.map(entry => entry.key),
    }
  }
}

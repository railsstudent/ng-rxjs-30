import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  private playDrumKey = new Subject<string>();
  playDrumKey$ = this.playDrumKey.asObservable();

  playSound(key: string) {
    this.playDrumKey.next(key);
  }
}

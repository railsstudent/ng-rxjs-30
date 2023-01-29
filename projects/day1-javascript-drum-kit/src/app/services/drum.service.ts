import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  private readonly playDrumKey = new Subject<string>();
  readonly playDrumKey$ = this.playDrumKey.asObservable();

  playSound(key: string) {
    this.playDrumKey.next(key);
  }
}

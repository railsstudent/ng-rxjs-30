import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  private readonly videoClickedSub = new Subject<string>();
  videoClicked$ = this.videoClickedSub.asObservable();

  constructor() { }

  updateVideoClicked(methodName: string) {
    this.videoClickedSub.next(methodName);
  }
}

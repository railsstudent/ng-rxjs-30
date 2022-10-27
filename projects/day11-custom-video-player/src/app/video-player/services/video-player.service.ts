import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  private readonly videoButtonIconSub = new Subject<string>();
  private readonly videoProgressBarSub = new Subject<string>();
  private readonly toggleButtonClickedSub = new Subject<void>();

  readonly videoButtonIcon$ = this.videoButtonIconSub.asObservable();
  readonly videoProgressBar$ = this.videoProgressBarSub.asObservable();
  readonly toggleButtonClicked$ = this.toggleButtonClickedSub.asObservable();

  updateVideoButtonIcon(icon: string) {
    this.videoButtonIconSub.next(icon);
  }

  updateVideoProgressTime(flexBasis: string) {
    this.videoProgressBarSub.next(flexBasis);
  }

  clickToggleButton() {
    this.toggleButtonClickedSub.next();
  }
}

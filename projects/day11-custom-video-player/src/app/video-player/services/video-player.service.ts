import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private readonly videoButtonIconSub = new Subject<string>();
  private readonly videoProgressBarSub = new Subject<string>();
  private readonly toggleButtonClickedSub = new Subject<void>();
  private readonly rangeUpdatedSub = new Subject<{ name: string; value: number; }>();

  readonly videoButtonIcon$ = this.videoButtonIconSub.asObservable();
  readonly videoProgressBar$ = this.videoProgressBarSub.asObservable();
  readonly toggleButtonClicked$ = this.toggleButtonClickedSub.asObservable();
  readonly rangeUpdated$ = this.rangeUpdatedSub.asObservable();

  updateVideoButtonIcon(icon: string) {
    this.videoButtonIconSub.next(icon);
  }

  updateVideoProgressTime(flexBasis: string) {
    this.videoProgressBarSub.next(flexBasis);
  }

  clickToggleButton() {
    this.toggleButtonClickedSub.next();
  }

  updateRange(result: { name: string; value: number; }): void {
    this.rangeUpdatedSub.next(result);
  }
}

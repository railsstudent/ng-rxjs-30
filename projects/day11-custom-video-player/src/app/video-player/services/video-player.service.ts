import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private readonly videoButtonIconSub = new Subject<string>();
  private readonly videoProgressBarSub = new Subject<string>();
  private readonly toggleButtonClickedSub = new Subject<void>();
  private readonly rangeUpdatedSub = new Subject<{ name: "volume" | "playbackRate"; value: number; }>();
  private readonly skipVideoSub = new Subject<number>();

  readonly videoButtonIcon$ = this.videoButtonIconSub.asObservable();
  readonly videoProgressBar$ = this.videoProgressBarSub.asObservable();
  readonly toggleButtonClicked$ = this.toggleButtonClickedSub.asObservable();
  readonly rangeUpdated$ = this.rangeUpdatedSub.asObservable();
  readonly skipVideo$ = this.skipVideoSub.asObservable();

  updateVideoButtonIcon(icon: string) {
    this.videoButtonIconSub.next(icon);
  }

  updateVideoProgressTime(flexBasis: string) {
    this.videoProgressBarSub.next(flexBasis);
  }

  clickToggleButton() {
    this.toggleButtonClickedSub.next();
  }

  updateRange(result: { name: "volume" | "playbackRate"; value: number; }): void {
    this.rangeUpdatedSub.next(result);
  }

  skipVideo(value: number): void {
    this.skipVideoSub.next(value);
  }
}

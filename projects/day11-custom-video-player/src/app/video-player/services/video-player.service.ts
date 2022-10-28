import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VideoPlayerControlInput } from '../types';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private readonly videoButtonIconSub = new Subject<string>();
  private readonly videoProgressBarSub = new Subject<string>();
  private readonly toggleButtonClickedSub = new Subject<void>();
  private readonly rangeUpdatedSub = new Subject<VideoPlayerControlInput>();
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

  updateRange(result: VideoPlayerControlInput): void {
    this.rangeUpdatedSub.next(result);
  }

  skipVideo(value: number): void {
    this.skipVideoSub.next(value);
  }
}

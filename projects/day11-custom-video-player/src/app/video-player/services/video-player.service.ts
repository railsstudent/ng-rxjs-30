import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { VideoAction, VideoPlayerRangeInput } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private readonly videoButtonIconSub = new Subject<string>();
  private readonly videoProgressBarSub = new Subject<string>();
  private readonly toggleButtonClickedSub = new Subject<void>();
  private readonly videoActionSub = new Subject<VideoAction>();

  readonly videoButtonIcon$ = this.videoButtonIconSub.asObservable();
  readonly videoProgressBar$ = this.videoProgressBarSub.asObservable();
  readonly toggleButtonClicked$ = this.toggleButtonClickedSub.asObservable();
  readonly videoAction$ = this.videoActionSub.asObservable();

  updateVideoButtonIcon(icon: string) {
    this.videoButtonIconSub.next(icon);
  }

  updateVideoProgressTime(flexBasis: string) {
    this.videoProgressBarSub.next(flexBasis);
  }

  clickToggleButton() {
    this.toggleButtonClickedSub.next();
  }

  updateVideoAction(action: VideoAction): void {
    this.videoActionSub.next(action);
  }
}

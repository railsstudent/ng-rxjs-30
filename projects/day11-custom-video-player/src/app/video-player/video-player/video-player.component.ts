import { APP_BASE_HREF } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { fromEvent, map, merge, Subscription, tap } from 'rxjs';
import { VideoActionEnum } from '../enums';
import { VideoAction, VideoPlayerRangeInput } from '../interfaces';
import { VideoPlayerService } from '../services';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="player">
      <video class="player__video viewer" currentTime="10" #video>
        <source [src]="videoSrc" type="video/mp4" />
      </video>
      <app-video-player-controls></app-video-player-controls>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        background: #7a419b;
        min-height: 100vh;
        background: linear-gradient(135deg, #7c1599 0%, #921099 48%, #7e4ae8 100%);
        background-size: cover;
        align-items: center;
        justify-content: center;
      }

      .player {
        max-width: 750px;
        border: 5px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        position: relative;
        font-size: 0;
        overflow: hidden;
      }

      /* This css is only applied when fullscreen is active. */
      .player:fullscreen {
        max-width: none;
        width: 100%;
      }

      .player:-webkit-full-screen {
        max-width: none;
        width: 100%;
      }

      .player__video {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true })
  video!: ElementRef<HTMLVideoElement>;

  subscription = new Subscription();

  constructor(@Inject(APP_BASE_HREF) private baseHref: string, private videoPlayerService: VideoPlayerService) {}

  ngOnInit(): void {
    const videoNativeElement = this.video.nativeElement;
    this.subscription.add(
      fromEvent(videoNativeElement, 'click')
        .pipe(
          map(() => ({ action: VideoActionEnum.TOGGLE_PLAY, arg: undefined })),
          tap((nextAction) => this.videoPlayerService.updateVideoAction(nextAction)),
        )
        .subscribe(),
    );

    this.subscription.add(
      merge(
        fromEvent(videoNativeElement, 'pause').pipe(map(() => '►')),
        fromEvent(videoNativeElement, 'play').pipe(map(() => '❚ ❚')),
      )
        .pipe(tap((icon) => this.videoPlayerService.updateVideoButtonIcon(icon)))
        .subscribe(),
    );

    this.subscription.add(
      fromEvent(videoNativeElement, 'timeupdate')
        .pipe(
          map(() => {
            const progressTime = (videoNativeElement.currentTime / videoNativeElement.duration) * 100;
            return `${progressTime}%`;
          }),
          tap((flexBasis) => this.videoPlayerService.updateVideoProgressTime(flexBasis)),
        )
        .subscribe(),
    );

    this.subscription.add(
      this.videoPlayerService.videoAction$.subscribe((nextAction) =>
        this.processAction(videoNativeElement, nextAction),
      ),
    );
  }

  private processAction(
    videoNativeElement: HTMLVideoElement,
    nextAction: VideoAction
  ): void {
    if (nextAction.action === VideoActionEnum.SKIP_BUTTON_CLICKED) {
      const seconds = nextAction.arg as number;
      videoNativeElement.currentTime = videoNativeElement.currentTime + seconds;
    } else if (nextAction.action === VideoActionEnum.RANGE_UPDATED) {
      const rangeInput = nextAction.arg as VideoPlayerRangeInput;
      videoNativeElement[rangeInput.name] = rangeInput.value;
    } else if (nextAction.action === VideoActionEnum.TOGGLE_PLAY) {
      const methodName = videoNativeElement.paused ? 'play' : 'pause';
      videoNativeElement[methodName]();
    } else if (
      [VideoActionEnum.PROGESS_BAR_CLICKED, VideoActionEnum.PROGRESS_BAR_DRAGGED].includes(nextAction.action)
    ) {
      const proportion = nextAction.arg as number;
      videoNativeElement.currentTime = proportion * videoNativeElement.duration;
    }
  }

  get videoSrc(): string {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/652333414.mp4`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

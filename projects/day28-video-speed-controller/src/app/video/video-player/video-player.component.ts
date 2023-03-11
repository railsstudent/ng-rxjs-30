import { APP_BASE_HREF } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  filter,
  fromEvent,
  map,
  Observable,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="wrapper">
      <video
        class="flex"
        width="765"
        height="430"
        [src]="videoSrc"
        loop
        controls
        #video
      ></video>
      <div class="speed" #speed>
        <div class="speed-bar" [style.height]="height$ | async">
          {{ playbackRate$ | async }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #4c4c4c url('https://unsplash.it/1500/900?image=1021');
        background-size: cover;
        font-family: sans-serif;
      }

      .wrapper {
        width: 850px;
        display: flex;
      }

      video {
        box-shadow: 0 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .speed {
        background: #efefef;
        flex: 1;
        display: flex;
        align-items: flex-start;
        margin: 10px;
        border-radius: 50px;
        box-shadow: 0 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .speed-bar {
        width: 100%;
        background: linear-gradient(-170deg, #2376ae 0%, #c16ecf 100%);
        text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;
        color: white;
        height: 16.3%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('video', { static: true, read: ElementRef })
  video!: ElementRef<HTMLVideoElement>;

  @ViewChild('speed', { static: true, read: ElementRef })
  speed!: ElementRef<HTMLDivElement>;

  height$!: Observable<string>;
  playbackRate$!: Observable<string>;

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) {}

  get videoSrc(): string {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/video.mp4`;
  }

  ngOnInit(): void {
    const nativeElement = this.speed.nativeElement;

    const mouseMove$ = fromEvent(nativeElement, 'mousemove').pipe(
      filter((e) => e instanceof MouseEvent),
      map((e) => e as MouseEvent),
      map((e) => {
        const y = e.pageY - nativeElement.offsetTop;
        const percent = y / nativeElement.offsetHeight;
        const min = 0.4;
        const max = 4;
        return {
          height: `${Math.round(percent * 100)}%`,
          playbackRate: percent * (max - min) + min,
        };
      }),
      tap(
        ({ playbackRate }) =>
          (this.video.nativeElement.playbackRate = playbackRate)
      ),
      shareReplay(1)
    );

    this.height$ = mouseMove$.pipe(map(({ height }) => height));
    this.playbackRate$ = mouseMove$.pipe(
      map(({ playbackRate }) => `${playbackRate.toFixed(2)}x`),
      startWith('1x')
    );
  }
}

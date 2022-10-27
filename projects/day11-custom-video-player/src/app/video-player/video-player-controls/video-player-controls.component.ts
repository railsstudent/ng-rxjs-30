import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, map, merge, startWith, Subscription, tap } from 'rxjs';
import { VideoPlayerService } from '../services';

@Component({
  selector: 'app-video-player-controls',
  template: `
    <div class="player__controls">
      <div class="progress" #progress>
        <div class="progress__filled" [style.flexBasis]="videoProgressBar$ | async"></div>
      </div>
      <button class="player__button toggle" title="Toggle Play" [textContent]="videoButtonIcon$ | async" #toggle>►</button>
      <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1" #volume>
      <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" #playback>
      <button data-skip="-10" class="player__button" #backward>« 10s</button>
      <button data-skip="25" class="player__button" #forward>25s »</button>
    </div>
  `,
  styleUrls: ['./video-player-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerControlsComponent implements OnInit, OnDestroy {

  @ViewChild('toggle', { static: true })
  toggleButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('backward', { static: true })
  backward!: ElementRef<HTMLButtonElement>;

  @ViewChild('forward', { static: true })
  forward!: ElementRef<HTMLButtonElement>;

  @ViewChild('volume', { static: true })
  volume!: ElementRef<HTMLInputElement>;

  @ViewChild('playback', { static: true })
  playback!: ElementRef<HTMLInputElement>;

  @ViewChild('progress', { static: true })
  progress!: ElementRef<HTMLDivElement>;

  videoButtonIcon$ = this.videoPlayerService.videoButtonIcon$.pipe(startWith('►'));

  videoProgressBar$ = this.videoPlayerService.videoProgressBar$;

  subscription = new Subscription();

  constructor(private videoPlayerService: VideoPlayerService) { }

  ngOnInit(): void {
    this.subscription.add(
      fromEvent(this.toggleButton.nativeElement, 'click')
        .pipe(tap(() => this.videoPlayerService.clickToggleButton()))
        .subscribe()
    );

    this.subscription.add(
      fromEvent([this.backward.nativeElement, this.forward.nativeElement], 'click')
        .pipe(
          map(({ target }) => {
            const buttonElement = target as HTMLButtonElement
            return buttonElement.dataset['skip']
          }),
          tap((value) => { 
            if (value) {
              this.videoPlayerService.skipVideo(+value)
            }
          })
        ).subscribe()
    );

    const ranges$ = ['change', 'mousemove'].map(eventName => {
      return fromEvent([this.volume.nativeElement, this.playback.nativeElement], eventName)
      .pipe(
        map(({ target }) => {
          const { name, value } = target as HTMLInputElement;
          return {
            name: name as "volume" | "playbackRate",
            value: +value            
          }
        })
      )
    })

    this.subscription.add(merge(...ranges$)
      .pipe(tap(result => this.videoPlayerService.updateRange(result)))
      .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

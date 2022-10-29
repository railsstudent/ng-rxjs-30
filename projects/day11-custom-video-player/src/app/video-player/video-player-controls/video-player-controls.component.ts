import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { map, merge, Observable, startWith, Subscription, tap, takeUntil, concatMap, fromEvent, filter } from 'rxjs';
import { VideoActionEnum } from '../enums';
import { VideoAction } from '../interfaces';
import { VideoPlayerService } from '../services';

@Component({
  selector: 'app-video-player-controls',
  template: `
    <div class="player__controls">
      <div class="progress" #progress>
        <div class="progress__filled" [style.flexBasis]="videoProgressBar$ | async"></div>
      </div>
      <button class="player__button toggle" title="Toggle Play" [textContent]="videoButtonIcon$ | async" #toggle>►</button>
      <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1" #range>
      <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1" #range>
      <button data-skip="-10" class="player__button" #skip>« 10s</button>
      <button data-skip="25" class="player__button" #skip>25s »</button>
    </div>
  `,
  styleUrls: ['./video-player-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerControlsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('toggle', { static: true })
  toggleButton!: ElementRef<HTMLButtonElement>;

  @ViewChildren('skip', { read: ElementRef })
  skipButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  @ViewChildren('range', { read: ElementRef })
  rangeInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChild('progress', { static: true })
  progress!: ElementRef<HTMLDivElement>;

  videoButtonIcon$ = this.videoPlayerService.videoButtonIcon$.pipe(startWith('►'));

  videoProgressBar$ = this.videoPlayerService.videoProgressBar$;

  subscription = new Subscription();

  constructor(private videoPlayerService: VideoPlayerService) { }

  ngOnInit(): void {
    this.subscription.add(
      fromEvent(this.toggleButton.nativeElement, 'click')
        .pipe(
          map(() => ({ action: VideoActionEnum.TOGGLE_PLAY, arg: undefined })),
          tap(nextAction => this.videoPlayerService.updateVideoAction(nextAction))
        ).subscribe()
    );

    const progressNativeElement = this.progress.nativeElement;
    this.subscription.add(
      fromEvent(progressNativeElement, 'click')
        .pipe(
          filter(event => event instanceof PointerEvent),
          map(event => event as PointerEvent),
          map(({ offsetX }) => this.createProgressBarAction(VideoActionEnum.PROGESS_BAR_CLICKED, offsetX)),
          tap(nextAction => this.videoPlayerService.updateVideoAction(nextAction))
        ).subscribe()
    );

    const mouseDown$ = fromEvent(progressNativeElement, 'mousedown');
    const drag$ = fromEvent(progressNativeElement, 'mousemove').pipe(
      takeUntil(fromEvent(progressNativeElement, 'mouseup'))
    );

    this.subscription.add(
      mouseDown$
        .pipe(
          concatMap(() => drag$.pipe(
            filter(event => event instanceof MouseEvent),
            map(event => event as MouseEvent),
            map(({ offsetX }) => this.createProgressBarAction(VideoActionEnum.PROGRESS_BAR_DRAGGED, offsetX))
          )),
          tap(nextAction => this.videoPlayerService.updateVideoAction(nextAction))        
        ).subscribe()
    )
  }

  private createProgressBarAction(action: VideoActionEnum, offsetX: number): VideoAction {
    return { action, arg: offsetX / this.progress.nativeElement.offsetWidth };
  }

  ngAfterViewInit(): void {
    const skipButtonEvents$ = this.skipButtons.reduce((acc, skipButton) => {
      const clickEvent$ = fromEvent(skipButton.nativeElement, 'click').pipe(
        map(({ target }) => {
          const strSeconds = (target as HTMLButtonElement).dataset['skip'];
          const seconds = strSeconds ? +strSeconds : 0;
          return {
            action: VideoActionEnum.SKIP_BUTTON_CLICKED,
            arg: seconds
          }
        }),
      )

      return acc.concat(clickEvent$);
    }, [] as Observable<VideoAction>[])

    const rangeInputEvents$ = this.rangeInputs.reduce((acc, rangeInput) => 
      acc.concat(this.addRangeUpdateEvent(rangeInput, 'change'), this.addRangeUpdateEvent(rangeInput, 'mousemove'))
    , [] as Observable<VideoAction>[]);

    this.subscription.add(merge(...skipButtonEvents$, ...rangeInputEvents$)
      .pipe(tap(nextAction => this.videoPlayerService.updateVideoAction(nextAction)))
      .subscribe());
  }

  private addRangeUpdateEvent(rangeInput: ElementRef<HTMLInputElement>, eventName: string): Observable<VideoAction> {
    return fromEvent(rangeInput.nativeElement, eventName).pipe(
      map(({ target }) => {
        const { name, value } = target as HTMLInputElement;
        return {
          action: VideoActionEnum.RANGE_UPDATED,
          arg: {
            name: name as "volume" | "playbackRate",
            value: +value
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

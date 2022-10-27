import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, startWith, Subscription, tap } from 'rxjs';
import { VideoPlayerService } from '../services';

@Component({
  selector: 'app-video-player-controls',
  template: `
    <div class="player__controls">
      <div class="progress">
        <div class="progress__filled" [style.flexBasis]="videoProgressBar$ | async"></div>
      </div>
      <button class="player__button toggle" title="Toggle Play" [textContent]="videoButtonIcon$ | async" #toggle>►</button>
      <input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
      <input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
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

  videoButtonIcon$ = this.videoPlayerService.videoButtonIcon$
    .pipe(startWith('►'));

  videoProgressBar$ = this.videoPlayerService.videoProgressBar$;

  subscription = new Subscription();

  constructor(private videoPlayerService: VideoPlayerService) { }

  ngOnInit(): void {
    this.subscription.add(
      fromEvent(this.toggleButton.nativeElement, 'click')
        .pipe(tap(() => this.videoPlayerService.clickToggleButton()))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

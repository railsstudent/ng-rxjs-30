import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-web-camera',
  template: `
  <ng-container>
    <div class="photobooth">
      <div class="controls">
        <button #btnPhoto>Take Photo</button>
      </div>
      <canvas class="photo" #photo></canvas>
      <video class="player" #player></video>
      <app-photo-stripe></app-photo-stripe>
    </div>
    <audio class="snap" [src]="soundUrl" hidden #snap></audio>
  </ng-container>
  `,
  styles: [`
  :host {
    display: block;
  }

  .photobooth {
    background: white;
    max-width: 150rem;
    margin: 2rem auto;
    border-radius: 2px;
  }

  /*clearfix*/
  .photobooth:after {
    content: '';
    display: block;
    clear: both;
  }

  .photo {
    width: 100%;
    float: left;
  }

  .player {
    position: absolute;
    top: 20px;
    right: 20px;
    width:200px;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebCameraComponent implements OnInit, OnDestroy {

  @ViewChild('btnPhoto', { static: true, read: ElementRef })
  btnPhoto!: ElementRef<HTMLButtonElement>;

  @ViewChild('snap', { static: true, read: ElementRef })
  snap!: ElementRef<HTMLAudioElement>;

  destroy$ = new Subject<void>();

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    const btnPhotoNative = this.btnPhoto.nativeElement;

    fromEvent(btnPhotoNative, 'click')
      .pipe(
        tap(() => {
          const snapElement = this.snap.nativeElement;
          snapElement.currentTime = 0;
          snapElement.play();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => console.log('button clicked'));
  }

  get soundUrl() {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${ isEndWithSlash ? '' : '/' }assets/audio/snap.mp3`; 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, map, merge, Observable, startWith, Subscription, tap } from 'rxjs';
import { VideoPlayerService } from '../services';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="player">
      <video class="player__video viewer" currentTime="10" #video>
        <source [src]="videoSrc" type="video/mp4">
      </video>
      <app-video-player-controls></app-video-player-controls>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      background: #7A419B;
      min-height: 100vh;
      background: linear-gradient(135deg, #7c1599 0%,#921099 48%,#7e4ae8 100%);
      background-size: cover;
      align-items: center;
      justify-content: center;
    }

    .player {
        max-width: 750px;
        border: 5px solid rgba(0,0,0,0.2);
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('video', { static: true })
  video!: ElementRef<HTMLVideoElement>;

  subscription = new Subscription();

  constructor(@Inject(APP_BASE_HREF) private baseHref: string, private videoService: VideoPlayerService) { }

  ngOnInit(): void {
    const videoNativeElement = this.video.nativeElement;
    this.subscription.add(
      fromEvent(videoNativeElement, 'click')
        .pipe(
          map(() => videoNativeElement.paused ? 'play' : 'pause'),
          tap((methodName) => this.videoService.updateVideoClicked(methodName))
        )
      .subscribe()
    );

    this.subscription.add(
      merge(
        fromEvent(videoNativeElement, 'play').pipe(map(() => '►')), 
        fromEvent(videoNativeElement, 'pause').pipe(map(() => '❚ ❚')),
      ).subscribe()
    );

    this.subscription.add(
      fromEvent(videoNativeElement, 'timeupdate')
        .pipe(map(() => (videoNativeElement.currentTime / videoNativeElement.duration) * 100))
        .subscribe()
    );
    
    // this.videoPlayer.nativeElement.play();
  }

  get videoSrc(): string {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/652333414.mp4`;
  }
}

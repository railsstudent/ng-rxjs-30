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
  styleUrls: ['video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('video', { static: true })
  video!: ElementRef<HTMLVideoElement>;

  subscription = new Subscription();

  constructor(@Inject(APP_BASE_HREF) private baseHref: string, private videoService: VideoPlayerService) { }

  ngOnInit(): void {
    const videoNativeElement = this.video.nativeElement;
    const videoClicked$ = fromEvent(videoNativeElement, 'click')
      .pipe(map(() => videoNativeElement.paused ? 'play' : 'pause'));

    const videoButtonIcon$ = 
      merge(
        fromEvent(videoNativeElement, 'play').pipe(map(() => '►')), 
        fromEvent(videoNativeElement, 'pause').pipe(map(() => '❚ ❚')),
      )

    const videoProgress$ = fromEvent(videoNativeElement, 'timeupdate')
      .pipe(map(() => (videoNativeElement.currentTime / videoNativeElement.duration) * 100));
        
        
      //   .pipe(map(() => false));  

    // this.videoService.isPlayerHover$ = merge(hover$, notHover$).pipe(startWith(true));

    // this.videoPlayer.nativeElement.play();
  }

  get videoSrc(): string {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/652333414.mp4`;
  }
}

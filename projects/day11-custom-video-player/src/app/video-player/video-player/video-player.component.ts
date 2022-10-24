import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="player">
      <video class="player__video viewer" currentTime="10">
        <source [src]="videoSrc" type="video/mp4">
      </video>
      <app-video-player-controls></app-video-player-controls>
    </div>
  `,
  styleUrls: ['video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit {

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
  }

  get videoSrc(): string {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/652333414.mp4`;
  }
}

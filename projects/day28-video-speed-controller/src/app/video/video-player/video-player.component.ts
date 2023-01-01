import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-player',
  template: `
    <div class="wrapper">
      <video class="flex" width="765" height="430" src="http://clips.vorwaerts-gmbh.de/VfE_html5.mp4" loop controls></video>
      <div class="speed">
        <div class="speed-bar">1×</div>
      </div>
    </div>
  `,
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

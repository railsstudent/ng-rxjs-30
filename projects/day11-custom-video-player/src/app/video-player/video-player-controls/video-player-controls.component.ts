import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-video-player-controls',
  templateUrl: './video-player-controls.component.html',
  styleUrls: ['./video-player-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerControlsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

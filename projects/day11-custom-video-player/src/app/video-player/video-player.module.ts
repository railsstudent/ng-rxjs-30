import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideoPlayerControlsComponent } from './video-player-controls/video-player-controls.component';

@NgModule({
  declarations: [VideoPlayerComponent, VideoPlayerControlsComponent],
  imports: [CommonModule],
  exports: [VideoPlayerComponent],
})
export class VideoPlayerModule {}

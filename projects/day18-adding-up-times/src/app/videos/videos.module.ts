import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';

@NgModule({
  declarations: [
    VideoListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VideoListComponent
  ]
})
export class VideosModule { }

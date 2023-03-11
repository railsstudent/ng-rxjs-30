import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import { FormatTotalSecondsPipe } from './pipes/format-total-seconds.pipe';

@NgModule({
  declarations: [VideoListComponent, FormatTotalSecondsPipe],
  imports: [CommonModule],
  exports: [VideoListComponent],
})
export class VideosModule {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  concatMap,
  from,
  reduce,
  shareReplay,
  tap,
  forkJoin,
  max,
  min,
} from 'rxjs';
import { averageVideoTime, minMaxVideos } from '../custom-operators';
import { VideoTime } from '../interfaces/video-time.interface';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-list',
  template: `
    <section class="container">
      <h1>Add video times</h1>
      <section class="video-wrapper">
        <div class="video-list">
          <p>Video Name - Video Time</p>
          <ul *ngIf="videoList$ | async as videoList">
            <li *ngFor="let video of videoList">
              {{ video.name }} - {{ video.time }}
            </li>
          </ul>
        </div>
        <div class="video-total" *ngIf="items$ | async as x">
          <p>Video Total</p>
          <p>{{ x.total | formatTotalSeconds }}</p>
          <p>Longest Video</p>
          <ul>
            <li>
              custom operator: {{ x.minMaxVideos.max?.name }} -
              {{ x.minMaxVideos.max?.time }}
            </li>
            <li>max operator: {{ x.maxVideo.name }} - {{ x.maxVideo.time }}</li>
          </ul>
          <p>Shortest Video</p>
          <ul>
            <li>
              custom operator: {{ x.minMaxVideos.min?.name }} -
              {{ x.minMaxVideos.min?.time }}
            </li>
            <li>min operator: {{ x.minVideo.name }} - {{ x.minVideo.time }}</li>
          </ul>
          <p>Average Video Time</p>
          <p>{{ x.averageVideoTime | formatTotalSeconds }}</p>
        </div>
      </section>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      h1 {
        text-align: center;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .video {
        &-wrapper {
          display: flex;
          flex-wrap: wrap;
        }

        &-list {
          flex-basis: 50%;
          padding: 1rem;

          p {
            text-decoration: underline;
          }

          li {
            margin: 0.5rem;
          }
        }

        &-total {
          flex-basis: 50%;
          padding: 1rem;

          p:first-of-type,
          p:nth-of-type(3),
          p:nth-of-type(4),
          p:nth-of-type(5) {
            text-decoration: underline;
          }

          p:nth-of-type(1) {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
          }

          p:nth-of-type(n + 2) {
            margin: 0.5rem;
          }

          ul,
          li {
            margin: 0.75rem;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent {
  videoList$ = this.videoService.getAll().pipe(
    tap(() => console.log('videoList$ observable')),
    shareReplay(1)
  );

  streamVideoList$ = this.videoList$.pipe(
    tap(() => console.log('streamVideoList$ observable')),
    concatMap((videoTimes) => from(videoTimes)),
    shareReplay(1)
  );

  items$ = forkJoin({
    total: this.streamVideoList$.pipe(
      tap(() => console.log('videoTotal$ observable')),
      reduce(
        (acc, videoTime) => acc + this.convertTotalSeconds(videoTime.time),
        0
      )
    ),
    minMaxVideos: this.streamVideoList$.pipe(
      tap(() => console.log('mixMaxVideos$ observable')),
      minMaxVideos((x, y) => this.compareVideoTimes(x, y))
    ),
    maxVideo: this.streamVideoList$.pipe(
      tap(() => console.log('maxVideo$ observable')),
      max((x, y) => this.compareVideoTimes(x, y))
    ),
    minVideo: this.streamVideoList$.pipe(
      tap(() => console.log('minVideo$ observable')),
      min((x, y) => this.compareVideoTimes(x, y))
    ),
    averageVideoTime: this.streamVideoList$.pipe(
      tap(() => console.log('averageVideoTime$ observable')),
      averageVideoTime(
        (acc: number, videoTime: VideoTime) =>
          acc + this.convertTotalSeconds(videoTime.time)
      )
    ),
  });

  constructor(private videoService: VideoService) {}

  private convertTotalSeconds(time: string): number {
    const [aMinutes, aSeconds] = time.split(':').map(parseFloat);
    return aSeconds + aMinutes * 60;
  }

  private compareVideoTimes(a: VideoTime, b: VideoTime) {
    const aTotalSeconds = this.convertTotalSeconds(a.time);
    const bTotalSeconds = this.convertTotalSeconds(b.time);

    return aTotalSeconds < bTotalSeconds ? -1 : 1;
  }
}

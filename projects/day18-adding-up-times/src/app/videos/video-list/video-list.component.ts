import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { concatMap, from, max, min, reduce, shareReplay, tap, forkJoin } from 'rxjs';
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
          <li *ngFor="let video of videoList">{{ video.name }} - {{ video.time }}</li>
        </ul>
      </div>
      <div class="video-total" *ngIf="items$ | async as x">
          <p>Video Total</p>
          <p>
            {{ x.total | formatTotalSeconds }}
          </p>
          <p>Longest Video</p>
          <p>
            {{ x.longest.name }} - {{ x.longest.time }}
          </p>
          <p>Shortest Video</p>
          <p>
            {{ x.shortest.name }} - {{ x.shortest.time }}
          </p>
      </div>
    </section>
  </section>  
  `,
  styles: [`
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

        p:nth-of-type(2n + 1) {
          text-decoration: underline;
        }

        p:nth-of-type(1) {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }

        p:nth-of-type(n+2) {
          margin: 0.5rem;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoListComponent {

  videoList$ = this.videoService.getAll()
    .pipe(
      tap(() => console.log('videoList$ observable')),
      shareReplay(1)
    );

  streamVideoList$ = this.videoList$
    .pipe(
      tap(() => console.log('streamVideoList$ observable')),
      concatMap(videoTimes => from(videoTimes)),
      shareReplay(1)
    );
    
  items$ = forkJoin({
    total: this.streamVideoList$
      .pipe(
        tap(() => console.log('videoTotal$ observable')),
        reduce((acc, videoTime) => {
          const [minutes, seconds] = videoTime.time.split(':').map(parseFloat);
          return acc + minutes * 60 + seconds;
        }, 0)
      ),
    longest: this.streamVideoList$
      .pipe(
        tap(() => console.log('longestVideo$ observable')),
        max((a, b) => this.compareVideoTimes(a, b)),
      ),
    shortest: this.streamVideoList$
      .pipe(
        tap(() => console.log('shortestVideo$ observable')),
        min((a, b) => this.compareVideoTimes(a, b)),
      )  
  })
  
  constructor(private videoService: VideoService) { }

  private compareVideoTimes (a: VideoTime, b: VideoTime) {
    const [aMinutes, aSeconds] = a.time.split(':').map(parseFloat);
    const aTotalSeconds = aSeconds + aMinutes * 60;

    const [bMinutes, bSeconds] = b.time.split(':').map(parseFloat);
    const bTotalSeconds = bSeconds + bMinutes * 60;

    return aTotalSeconds < bTotalSeconds ? -1 : 1;
  }
}

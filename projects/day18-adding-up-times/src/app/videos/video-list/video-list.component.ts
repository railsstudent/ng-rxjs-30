import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';
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
      <div class="video-total">
        <p>Video Total</p>
        <p *ngIf="videoTotal$ | async as videoTotal">
          {{ videoTotal }}
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
        border: 1px solid green;
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
        border: 1px solid blue;
        flex-basis: 50%;
        padding: 1rem;

        p:first-of-type {
          text-decoration: underline;
        }

        p:nth-of-type(n+1) {
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
      tap((data) => console.log('videoList$ observable', data)),
      shareReplay(1)
    );

  videoTotal$ = this.videoList$
      .pipe(
        tap(() => console.log('videoTotal$ observable')),
        map(videoTimes => 
          videoTimes.map(videoTime => {
            const [minutes, seconds] = videoTime.time.split(':').map(parseFloat);
            return seconds + minutes * 60;
          })
        ),
        map(arrSeconds => {
          const totalSeconds = arrSeconds.reduce((acc, second) => acc + second, 0); 
          const hours = Math.floor(totalSeconds / 60 / 60);
          const minutes = Math.floor((totalSeconds - (hours * 60 * 60)) / 60);
          const seconds = totalSeconds - (hours * 60 * 60) - (minutes * 60);
          return `${hours} Hours ${minutes} minutes ${seconds} seconds`;
        })
      )
  
  constructor(private videoService: VideoService) { }
}

import { Videos } from './../interfaces/video-time.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { VideoTime } from '../interfaces/video-time.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<VideoTime[]> {
    const url = 'https://gist.githubusercontent.com/railsstudent/9a53e81fc89e4ba04f8234ad8a560878/raw/c18b8cadaa607cc47063b8be230fbd79f49b3d64/video-times.json';

    return this.httpClient.get<Videos>(url)
      .pipe(
        map(({videos }) => videos),
        catchError(err => {
          console.error(err);
          return of([] as VideoTime[]);
        })         
      );
  }
}

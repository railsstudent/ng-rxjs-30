import { Observable, concatMap, scan, startWith, take, timer } from 'rxjs';

export function trackGameTime<T>(gameDurationInSeconds = 10) {
  return function (source: Observable<T>) {
    return source.pipe(
      concatMap(() =>
        timer(0, 1000).pipe(
          take(gameDurationInSeconds),
          scan((acc) => acc - 1, gameDurationInSeconds)
        )
      ),
      startWith(gameDurationInSeconds)
    );
  };
}

import { Observable, concatMap, map, scan, startWith, take, timer } from 'rxjs';

export function trackGameTime<T>(gameDurationInSeconds = 10) {
    return function(source: Observable<T>) {
        return source.pipe(
            concatMap(() => timer(0, 1000).pipe(
                take(gameDurationInSeconds),
                map(() => 1),
                scan((acc, value) => acc - value, gameDurationInSeconds),
                map((seconds) => `${seconds} seconds`)
              )),
              startWith(`${gameDurationInSeconds} seconds`),
        )
    }
}

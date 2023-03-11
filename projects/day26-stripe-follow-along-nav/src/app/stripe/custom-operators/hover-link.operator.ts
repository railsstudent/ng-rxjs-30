import { Observable, concatMap, tap, timer } from 'rxjs';

export function hoverLink<T extends HTMLElement>(nativeElement: T) {
  return function (source: Observable<any>) {
    return source.pipe(
      tap(() => nativeElement.classList.add('trigger-enter')),
      concatMap(() =>
        timer(150).pipe(
          tap(() => {
            if (nativeElement.classList.contains('trigger-enter')) {
              nativeElement.classList.add('trigger-enter-active');
            }
          })
        )
      )
    );
  };
}

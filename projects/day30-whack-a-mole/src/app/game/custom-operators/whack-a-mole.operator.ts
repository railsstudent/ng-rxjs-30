import { Observable, filter, map, tap } from 'rxjs';
import { SCORE_ACTION } from '../mole/mole.enum';

export function whackAMole<T extends HTMLElement>(nativeElement: T) {
  return function (source: Observable<Event>) {
    return source.pipe(
      filter((event) => event.isTrusted),
      tap(() => {
        if (nativeElement.parentElement) {
          nativeElement.parentElement.classList.remove('up');
        }
      }),
      map(() => SCORE_ACTION.ADD),
    );
  };
}

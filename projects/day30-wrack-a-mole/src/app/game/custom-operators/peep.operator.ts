import { ElementRef, QueryList } from '@angular/core';
import { Observable, concatMap, map, repeat, takeUntil, tap, timer } from 'rxjs';

type Holes = QueryList<ElementRef<HTMLDivElement>>;

function randomTime(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes: Holes, lastHole: HTMLDivElement | undefined): HTMLDivElement {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes.get(idx);

    if (!hole) {
      console.log('Ah nah the hole is undefined');
      return randomHole(holes, lastHole);
    }

    if (lastHole && hole.nativeElement === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes, lastHole);
    }

    return hole.nativeElement;
}

export function peep<T>(holes: Holes, lastHole: HTMLDivElement | undefined): (source: Observable<T>) => Observable<HTMLDivElement> {
    // const tenSeconds = 10000;
    // const gameExpires$ = timer(tenSeconds);
    
    return function(source: Observable<T>) {
        return source.pipe(
            map(() => {
                const upTime = randomTime(500, 1000);
                const hole = randomHole(holes, lastHole);

                return {
                    upTime,
                    hole,
                }
            }),
            concatMap(({ upTime, hole }) => {
                hole.classList.add('up');
                return timer(upTime)
                    .pipe(
                        tap(() => hole.classList.remove('up')),
                        map(() => hole)
                    );  
            }),
            // takeUntil(gameExpires$),
            // repeat(),
        );
    }
}

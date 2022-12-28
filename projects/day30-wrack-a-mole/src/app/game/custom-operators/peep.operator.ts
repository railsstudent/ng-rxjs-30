import { ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, tap, timer } from 'rxjs';

type Holes = ElementRef<HTMLDivElement>[];

function randomTime(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes: Holes, lastHole: number): number {
    console.log('In randomHole', 'lastHole', lastHole);

    const idx = Math.floor(Math.random() * holes.length);

    if (idx === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes, lastHole);
    }

    return idx;
}

export function peep<T>(holes: Holes, lastHole: BehaviorSubject<number>): (source: Observable<T>) => Observable<number> {
    return function(source: Observable<T>) {
        return source.pipe(
            map(() => {
                const upTime = randomTime(500, 1000);
                const holeIdx = randomHole(holes, lastHole.getValue());

                return {
                    upTime,
                    holeIdx,
                }
            }),
            concatMap(({ upTime, holeIdx }) => {
                lastHole.next(holeIdx);
                const hole = holes[holeIdx].nativeElement;
                hole.classList.add('up');
                return timer(upTime)
                    .pipe(
                        tap(() => hole.classList.remove('up')),
                        map(() => holeIdx)
                    );  
            }),
        );
    }
}

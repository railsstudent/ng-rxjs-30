import { ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, map, tap, timer } from 'rxjs';

function randomTime(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes: ElementRef<HTMLDivElement>[], lastHole: number): number {
    const idx = Math.floor(Math.random() * holes.length);
    console.log('In randomHole', 'lastHole', lastHole, 'next hole', idx);

    if (idx === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes, lastHole);
    }

    return idx;
}

export function peep<T extends number>(holes: ElementRef<HTMLDivElement>[], minUpTime: number, maxUpTime: number) {
    return function(source: Observable<T>) {
        return source.pipe(
            map((lastHole) => ({
                upTime: randomTime(minUpTime, maxUpTime),
                holeIdx: randomHole(holes, lastHole),
            })),
            concatMap(({ upTime, holeIdx }) => {
                if (source instanceof BehaviorSubject) {
                    source.next(holeIdx);
                }
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

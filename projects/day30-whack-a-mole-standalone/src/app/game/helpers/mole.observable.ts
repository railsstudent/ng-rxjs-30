import { ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, delay, fromEvent, map, merge, scan, shareReplay, startWith, take, takeUntil, timer } from 'rxjs';
import { peep, trackGameTime, whackAMole } from '../custom-operators';
import { SCORE_ACTION } from '../mole/mole.enum';
  
const createStartButtonObservable = (btnNativeElement: HTMLButtonElement) => fromEvent(btnNativeElement, 'click')
    .pipe(
        map(() => SCORE_ACTION.RESET),
        shareReplay(1)
    );

const createScoreObservable = (startButtonClicked$: Observable<SCORE_ACTION>, moles: ElementRef<HTMLDivElement>[]) => {
    const molesClickedArray$ = moles.map(
        ({ nativeElement }) => fromEvent(nativeElement, 'click').pipe(whackAMole(nativeElement))
    );
    
    return merge(...molesClickedArray$, startButtonClicked$)
        .pipe(
            scan((score, action) => action === SCORE_ACTION.RESET ? 0 : score + 1, 0),
            startWith(0)
        );
}

export const createGameObservablesFn = () => {
    const delayTime = 3;
    const gameDuration = 10;
    const MILLISECOND = 1000;
    
    return (
        btnNativeElement: HTMLButtonElement, 
        moles: ElementRef<HTMLDivElement>[], 
        holes: ElementRef<HTMLDivElement>[]
    ) => {
        const startButtonClicked$ = createStartButtonObservable(btnNativeElement);
        const score$ = createScoreObservable(startButtonClicked$, moles);
        const delayGameMsg$ =  startButtonClicked$.pipe(
            concatMap(() => timer(0, MILLISECOND)
                .pipe(
                    take(delayTime + 1),
                    map((value) => delayTime - value),
                ))
            );

        const resetTime$ = startButtonClicked$.pipe(map(() => gameDuration));
        const delayGameStart$ = startButtonClicked$.pipe(
            delay(delayTime * MILLISECOND),
            shareReplay(1)
        );
        const timeLeft$ = merge(resetTime$, delayGameStart$.pipe(trackGameTime(gameDuration)));
        const lastHoleUpdated = new BehaviorSubject<number>(-1);
        const createGame$ = delayGameStart$.pipe(
            concatMap(() => 
                lastHoleUpdated.pipe(
                    peep(holes, 350, 1000),
                    takeUntil(timer(gameDuration * MILLISECOND))
                )
            )
        );

        return {
            delayGameMsg$,
            timeLeft$,
            score$,
            createGame$,
        }
    }
}

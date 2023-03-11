import { Observable } from 'rxjs';

export interface GameObservables {
    delayGameMsg$: Observable<number>,
    timeLeft$: Observable<number>,
    score$: Observable<number>,
    createGame$: Observable<number>,
}   

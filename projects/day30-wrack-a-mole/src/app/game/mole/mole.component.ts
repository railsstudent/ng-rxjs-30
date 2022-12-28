import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, concatMap, delay, filter, fromEvent, map, merge, scan, shareReplay, startWith, takeUntil, tap, timer } from 'rxjs';
import { peep, trackGameTime } from '../custom-operators';
import { SCORE_ACTION } from './mole.enum';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">{{ score$ | async }}</span></h1>
    <button #start class="start">Start!</button>
    <span class="duration">Time remained: {{ timeLeft$ | async }}</span>
    <div class="game">
      <div class="hole hole1" [style]="'--hole-image:' + holeSrc" #hole1>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole1></div>
      </div>
      <div class="hole hole2" [style]="'--hole-image:' + holeSrc" #hole2>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole2></div>
      </div>
      <div class="hole hole3" [style]="'--hole-image:' + holeSrc" #hole3>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole3></div>
      </div>
      <div class="hole hole4" [style]="'--hole-image:' + holeSrc" #hole4>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole4></div>
      </div>
      <div class="hole hole5" [style]="'--hole-image:' + holeSrc" #hole5>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole5></div>
      </div>
      <div class="hole hole6" [style]="'--hole-image:' + holeSrc" #hole6>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole6></div>
      </div>
    </div>`,
  styleUrls: ['mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnInit, OnDestroy {

  @ViewChild('start', { static: true, read: ElementRef })
  startButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('hole1', { static: true, read: ElementRef })
  hole1!: ElementRef<HTMLDivElement>;
  
  @ViewChild('hole2', { static: true, read: ElementRef })
  hole2!: ElementRef<HTMLDivElement>;

  @ViewChild('hole3', { static: true, read: ElementRef })
  hole3!: ElementRef<HTMLDivElement>;
  
  @ViewChild('hole4', { static: true, read: ElementRef })
  hole4!: ElementRef<HTMLDivElement>;
  
  @ViewChild('hole5', { static: true, read: ElementRef })
  hole5!: ElementRef<HTMLDivElement>;
  
  @ViewChild('hole6', { static: true, read: ElementRef })
  hole6!: ElementRef<HTMLDivElement>;

  @ViewChild('mole1', { static: true, read: ElementRef })
  mole1!: ElementRef<HTMLDivElement>;
  
  @ViewChild('mole2', { static: true, read: ElementRef })
  mole2!: ElementRef<HTMLDivElement>;  
  
  @ViewChild('mole3', { static: true, read: ElementRef })
  mole3!: ElementRef<HTMLDivElement>;  
  
  @ViewChild('mole4', { static: true, read: ElementRef })
  mole4!: ElementRef<HTMLDivElement>;  
  
  @ViewChild('mole5', { static: true, read: ElementRef })
  mole5!: ElementRef<HTMLDivElement>;  
  
  @ViewChild('mole6', { static: true, read: ElementRef })
  mole6!: ElementRef<HTMLDivElement>;

  score$!: Observable<number>;
  timeLeft$!: Observable<string>;
  subscription = new Subscription();
  lastHoleUpdated = new BehaviorSubject<number>(-1);

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    const moles = [this.mole1, this.mole2, this.mole3, this.mole4, this.mole5, this.mole6];
    const molesClickedArray$ = moles.map(mole => this.createMoleClickedObservable(mole));
    const startButtonClicked$ = fromEvent(this.startButton.nativeElement, 'click')
      .pipe(
        map(() => SCORE_ACTION.RESET),
        shareReplay(1)
      );

    this.score$ = merge(...molesClickedArray$, startButtonClicked$)
      .pipe(
        scan((score, action) => action === SCORE_ACTION.RESET ? 0 : score + 1, 0),
        startWith(0),
      );

    const delayTime = 3;
    this.delayGameMsg$ = startButtonClicked$.pipe(
      concatMap(() => {
        return timer(0, 1000)
          .pipe(
            take(delayTime + 1),
            map((value) => delayTime - value),
            map((seconds) => seconds > 0 ? `Moles will appear in ${seconds} seconds` : ''),
          )
      }),
    );

    const delayGameStart$ = startButtonClicked$.pipe(
      delay(delayTime * 1000),
      shareReplay(1)
    );

    const gameDuration = 10;
    this.timeLeft$ = delayGameStart$.pipe(trackGameTime(gameDuration));

    this.subscription.add(this.createGame(gameDuration, delayGameStart$));
  }

  private createGame(gameDuration: number, delayGameStart$: Observable<SCORE_ACTION>): Subscription {
    const holes = [this.hole1, this.hole2, this.hole3, this.hole4, this.hole5, this.hole6];
    const gameExpired$ = timer(gameDuration * 1000);
    const gameLoop$ = this.lastHoleUpdated
      .pipe(
        peep(holes, 250, 1000),
        takeUntil(gameExpired$)
      );

    return delayGameStart$.pipe(concatMap(() => gameLoop$)).subscribe();
  }

  get moleSrc(): string {
    return this.buildImage('mole.svg');
  }

  get holeSrc(): string {
    return this.buildImage('dirt.svg');
  }

  private createMoleClickedObservable(mole: ElementRef<HTMLDivElement>): Observable<SCORE_ACTION> {
    const nativeElement = mole.nativeElement;
    return fromEvent(nativeElement, 'click')
      .pipe(
        filter(event => event.isTrusted),
        tap(() => {
          if (nativeElement.parentElement) {
            nativeElement.parentElement.classList.remove('up');
          }
        }),
        map(() => SCORE_ACTION.ADD)
      );
  }

  private buildImage(image: string) {
    const isEndWithSlash = this.baseHref.endsWith('/');
    const imagePath = `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/images/${image}`;
    return `url('${imagePath}')`
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

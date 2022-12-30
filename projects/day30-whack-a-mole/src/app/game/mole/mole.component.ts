import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, concatMap, delay, fromEvent, map, merge, scan, shareReplay, startWith, take, takeUntil, timer } from 'rxjs';
import { peep, trackGameTime, whackAMole } from '../custom-operators';
import { SCORE_ACTION } from './mole.enum';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">{{ score$ | async }}</span></h1>
    <button #start class="start">Start!</button>
    <ng-container *ngIf="{ timeLeft: timeLeft$ | async } as data">
      <span class="duration">{{ data.timeLeft | remainingTime }}</span>
    </ng-container>
    <ng-container *ngIf="delayGameMsg$ | async as delayGameMsg">
      <span class="message">{{ delayGameMsg | whackAMoletMessage }}</span>
    </ng-container>
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
  timeLeft$!: Observable<number>;
  delayGameMsg$!: Observable<number>
  subscription = new Subscription();
  lastHoleUpdated = new BehaviorSubject<number>(-1);

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    const molesClickedArray$ = this.createMoleClickedObservables(this.mole1, this.mole2, this.mole3, this.mole4, this.mole5, this.mole6);
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
      concatMap(() => timer(0, 1000)
        .pipe(
          take(delayTime + 1),
          map((value) => delayTime - value),
        ))
      );

    const delayGameStart$ = startButtonClicked$.pipe(
      delay(delayTime * 1000),
      shareReplay(1)
    );

    const gameDuration = 10;
    const resetTime$ = startButtonClicked$.pipe(map(() => gameDuration));
    this.timeLeft$ = merge(resetTime$, delayGameStart$.pipe(trackGameTime(gameDuration)));

    const createGame = delayGameStart$.pipe(concatMap(() => this.lastHoleUpdated
      .pipe(
        peep([this.hole1, this.hole2, this.hole3, this.hole4, this.hole5, this.hole6], 350, 1000),
        takeUntil(timer(gameDuration * 1000))
      )
    ))
    .subscribe();

    this.subscription.add(createGame);
  }

  get moleSrc(): string {
    return this.buildImage('mole.svg');
  }

  get holeSrc(): string {
    return this.buildImage('dirt.svg');
  }

  private createMoleClickedObservables(...moles: ElementRef<HTMLDivElement>[]): Observable<SCORE_ACTION>[] {
    return moles.map(({ nativeElement }) => fromEvent(nativeElement, 'click').pipe(whackAMole(nativeElement)));
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

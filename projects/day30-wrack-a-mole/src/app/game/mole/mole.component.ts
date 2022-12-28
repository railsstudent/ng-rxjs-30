import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, concatMap, filter, fromEvent, merge, repeat, scan, startWith, takeWhile, tap } from 'rxjs';
import { peep } from '../custom-operators/peep.operator';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">{{ score$ | async }}</span></h1>
    <button #start class="start">Start!</button>
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
  subscription = new Subscription();
  lastHoleUpdated = new BehaviorSubject<number>(-1);
  startGameTimestamp = new BehaviorSubject(Date.now());

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    const mole1Clicked$ = this.createMoleClickObservable(this.mole1.nativeElement);
    const mole2Clicked$ = this.createMoleClickObservable(this.mole2.nativeElement);
    const mole3Clicked$ = this.createMoleClickObservable(this.mole3.nativeElement);
    const mole4Clicked$ = this.createMoleClickObservable(this.mole4.nativeElement);
    const mole5Clicked$ = this.createMoleClickObservable(this.mole5.nativeElement);
    const mole6Clicked$ = this.createMoleClickObservable(this.mole6.nativeElement);

    this.score$ = merge(mole1Clicked$, mole2Clicked$, mole3Clicked$, mole4Clicked$, mole5Clicked$, mole6Clicked$)
      .pipe(
        scan((score) => score + 1, 0),
        startWith(0),
      );

    const holes = [this.hole1, this.hole2, this.hole3, this.hole4, this.hole5, this.hole6];

    const gameLoop$ = this.lastHoleUpdated
        .pipe(
          peep(holes, this.lastHoleUpdated),
          repeat(),
          takeWhile(() => {
            const tenSeconds = 10000;
            const currentTime = Date.now();
            const gameEndTime = this.startGameTimestamp.getValue() + tenSeconds;
            return currentTime <= gameEndTime;
          }),
        )

    const startGame = fromEvent(this.startButton.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.startGameTimestamp.next(Date.now());
          console.log('start game now', new Date(this.startGameTimestamp.getValue()).toISOString())
        }),
        concatMap(() => gameLoop$),
      )
      .subscribe();

    this.subscription.add(startGame);
  }

  get moleSrc(): string {
    return this.buildImage('mole.svg');
  }

  get holeSrc(): string {
    return this.buildImage('dirt.svg');
  }

  private createMoleClickObservable(nativeElement: HTMLDivElement): Observable<Event> {
    return fromEvent(nativeElement, 'click')
      .pipe(
        filter(event => event.isTrusted),
        tap(() => {
          if (nativeElement.parentElement) {
            nativeElement.parentElement.classList.remove('up');
          }
        })
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

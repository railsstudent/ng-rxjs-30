import { APP_BASE_HREF } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, filter, fromEvent, merge, scan, startWith, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">0</span></h1>
    <button #start>Start!</button>
    <div class="game">
      <div *ngFor="let id of [1, 2, 3, 4, 5, 6]" class="hole hole{{id}}" [style]="'--hole-image:' + holeSrc" #holes>
        <div class="mole" [style]="'--mole-image:' + moleSrc" #moles></div>
      </div>
    </div>`,
  styleUrls: ['mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('start', { static: true, read: ElementRef })
  startButton!: ElementRef<HTMLButtonElement>;

  @ViewChildren('moles', { read: ElementRef })
  moles!: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChildren('holes', { read: ElementRef })
  holes!: QueryList<ElementRef<HTMLDivElement>>;

  score$!: Observable<number>;
  subscription = new Subscription();
  lastHoleUpdated = new BehaviorSubject<HTMLDivElement | undefined>(undefined);

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    const gameExpires$ = timer(10000);

    this.subscription.add(
      fromEvent(this.startButton.nativeElement, 'click')
        .pipe(
          tap(() => console.log('start game now', new Date().toISOString())),
          takeUntil(gameExpires$)
        )
        .subscribe(() => console.log('start game end', new Date().toISOString()))
    );
  }

  get moleSrc(): string {
    return this.buildImage('mole.svg');
  }

  get holeSrc(): string {
    return this.buildImage('dirt.svg');
  }

  private buildImage(image: string) {
    const isEndWithSlash = this.baseHref.endsWith('/');
    const imagePath = `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/images/${image}`;
    return `url('${imagePath}')`
  }

  ngAfterViewInit(): void {
    console.log('this.holes', this.holes);
    console.log('this.moles', this.moles);
    const molesClicked$ = this.moles.map(({ nativeElement }) => 
      fromEvent(nativeElement, 'click')
        .pipe(
          filter(event => event.isTrusted),
          tap(() => {
            if (nativeElement.parentElement) {
              nativeElement.parentElement.classList.remove('up');
            }
            console.log('mole clicked');
          })
        )
    );

    this.score$ = merge(...molesClicked$)
      .pipe(
        scan((score) => score + 1, 0),
        startWith(0),
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  randomTime(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }

  randomHole(): HTMLDivElement {
    const idx = Math.floor(Math.random() * this.holes.length);
    const lastHole = this.lastHoleUpdated.getValue();
    const hole = this.holes.get(idx);

    if (!hole) {
      console.log('Ah nah the hole is undefined');
      return this.randomHole();
    }

    if (lastHole && hole.nativeElement === lastHole) {
      console.log('Ah nah thats the same one bud');
      return this.randomHole();
    }
    this.lastHoleUpdated.next(hole.nativeElement);
    return hole.nativeElement;
  }
}

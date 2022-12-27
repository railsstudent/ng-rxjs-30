import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, QueryList, ElementRef, ViewChildren, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, fromEvent, merge, scan, startWith, takeUntil, tap, timer } from 'rxjs';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">0</span></h1>
    <button #start>Start!</button>
    <div class="game">
      <div *ngFor="let id of [1, 2, 3, 4, 5, 6]" class="hole hole{{id}}" [style]="'--hole-image:' + holeSrc">
        <div class="mole" [style]="'--mole-image:' + moleSrc" #mole></div>
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

  score$!: Observable<number>;
  subscription = new Subscription();

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
    const gameExpires$ = timer(10000);

    this.subscription.add(
      fromEvent(this.startButton.nativeElement, 'click')
        .pipe(
          takeUntil(gameExpires$)
        )
        .subscribe(() => console.log('start game'))
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


  // randomTime(min: number, max: number): number {
  //   return Math.round(Math.random() * (max - min) + min);
  // }

  // randomHole(holes) {
  //   const idx = Math.floor(Math.random() * holes.length);
  //   const hole = holes[idx];
  //   if (hole === lastHole) {
  //     console.log('Ah nah thats the same one bud');
  //     return this.randomHole(holes);
  //   }
  //   lastHole = hole;
  //   return hole;
  // }
}

import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { createGameObservablesFn, cssHoleImage, cssMoleImage } from '../helpers';
import { GameObservables } from '../interfaces/game.interface';
import { RemainingTimePipe, WhackAMoleMessagePipe } from '../pipes';

@Component({
  selector: 'app-mole',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgStyle, WhackAMoleMessagePipe, RemainingTimePipe],
  template: `
    <h1>
      Whack-a-mole! <span class="score">{{ observables.score$ | async }}</span>
    </h1>
    <button #start class="start">Start!</button>
    <span class="duration">{{ observables.timeLeft$ | async | remainingTime }}</span>
    <span class="message">{{ observables.delayGameMsg$ | async | whackAMoleMessage }}</span>
    <div class="game">
      <div class="hole" [ngStyle]="holeImage" #hole1>
        <div class="mole" [ngStyle]="moleImage" #mole1></div>
      </div>
      <div class="hole" [ngStyle]="holeImage" #hole2>
        <div class="mole" [ngStyle]="moleImage" #mole2></div>
      </div>
      <div class="hole" [ngStyle]="holeImage" #hole3>
        <div class="mole" [ngStyle]="moleImage" #mole3></div>
      </div>
      <div class="hole" [ngStyle]="holeImage" #hole4>
        <div class="mole" [ngStyle]="moleImage" #mole4></div>
      </div>
      <div class="hole" [ngStyle]="holeImage" #hole5>
        <div class="mole" [ngStyle]="moleImage" #mole5></div>
      </div>
      <div class="hole" [ngStyle]="holeImage" #hole6>
        <div class="mole" [ngStyle]="moleImage" #mole6></div>
      </div>
    </div>`,
  styleUrls: ['mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  observables!: GameObservables;
  subscription!: Subscription;
  holeImage = cssHoleImage();
  moleImage = cssMoleImage();

  createDelayGameObservables = createGameObservablesFn();

  ngOnInit(): void {
    const moles = [this.mole1, this.mole2, this.mole3, this.mole4, this.mole5, this.mole6];
    const holes = [this.hole1, this.hole2, this.hole3, this.hole4, this.hole5, this.hole6];
    this.observables = this.createDelayGameObservables(this.startButton.nativeElement, moles, holes);
    this.subscription = this.observables.createGame$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

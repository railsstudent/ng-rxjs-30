import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, fromEvent, map, merge, tap } from 'rxjs';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-speech-text',
  template: `
    <ng-container>
      <textarea name="text" [(ngModel)]="msg" (change)="textChanged$.next()"></textarea>
      <button id="stop" #stop>Stop!</button>
      <button id="speak" #speak>Speak</button>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }

    button, textarea {
      width: 100%;
      display: block;
      margin: 10px 0;
      padding: 10px;
      border: 0;
      font-size: 2rem;
      background: #F7F7F7;
      outline: 0;
    }

    textarea {
      height: 20rem;
    }

    button {
      background: #ffc600;
      border: 0;
      width: 49%;
      float: left;
      font-family: 'Pacifico', cursive;
      margin-bottom: 0;
      font-size: 2rem;
      border-bottom: 5px solid #F3C010;
      cursor: pointer;
      position: relative;
    }

    button:active {
      top: 2px;
    }

    button:nth-of-type(1) {
      margin-right: 2%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechTextComponent implements OnInit, OnDestroy {
  @ViewChild('stop', { static: true, read: ElementRef })
  btnStop!: ElementRef<HTMLButtonElement>;

  @ViewChild('speak', { static: true, read: ElementRef })
  btnSpeak!: ElementRef<HTMLButtonElement>;

  textChanged$ = new Subject<void>();
  subscription = new Subscription();
  msg = 'Hello! I love JavaScript 👍';

  constructor(private speechService: SpeechService) { }

  ngOnInit(): void {
    this.speechService.updateSpeech({ name: 'text', value: this.msg });

    const btnStop$ = fromEvent(this.btnStop.nativeElement, 'click').pipe(map(() => false));
    const btnSpeak$ = fromEvent(this.btnSpeak.nativeElement, 'click').pipe(map(() => true));
    this.subscription.add(
      merge(btnStop$, btnSpeak$)
        .pipe(tap(() => this.speechService.updateSpeech({ name: 'text', value: this.msg })))
        .subscribe((startOver) => this.speechService.toggle(startOver))
    );

    this.subscription.add(
      this.textChanged$
        .pipe(tap(() => this.speechService.updateSpeech({ name: 'text', value: this.msg })))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

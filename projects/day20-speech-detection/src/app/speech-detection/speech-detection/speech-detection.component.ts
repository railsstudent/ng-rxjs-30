import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, fromEvent, map, scan, tap } from 'rxjs';
import { SpeechRecognitionInfo, Transcript } from '../interfaces/speech-recognition.interface';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-speech-detection',
  template: `
    <div class="words" contenteditable>
      <ng-container *ngIf="wordList$ | async as wordList">
        <p *ngFor="let word of wordList">{{ word.transcript }}, confidence: {{ word.confidencePercentage }}%</p>
      </ng-container>
    </div>`,
  styles: [`
    :host {
      display: block;
    }

    .words {
      max-width: 500px;
      margin: 50px auto;
      background: white;
      border-radius: 5px;
      box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
      padding: 1rem 2rem 1rem 5rem;
      background: -webkit-gradient(linear, 0 0, 0 100%, from(#d9eaf3), color-stop(4%, #fff)) 0 4px;
      background-size: 100% 3rem;
      position: relative;
      line-height: 3rem;
    }
    
    p {
      margin: 0 0 3rem;
    }

    .words:before {
      content: '';
      position: absolute;
      width: 4px;
      top: 0;
      left: 30px;
      bottom: 0;
      border: 1px solid;
      border-color: transparent #efe4e4;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechDetectionComponent implements OnInit, OnDestroy {
  wordList$!: Observable<Transcript[]>;
  subscription = new Subscription();

  ngOnInit(): void {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    this.subscription.add(
      fromEvent(recognition, 'end').pipe(tap(() => recognition.start())).subscribe()
    );

    const percent = 100;
    this.wordList$ = fromEvent(recognition, 'result').pipe(
        map((e: any): SpeechRecognitionInfo =>  { 
          const transcript = Array.from(e.results).map((result: any) => result[0].transcript).join('');
          const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
          const firstResult = e.results[0];

          return {
            transcript: poopScript,
            confidence: firstResult[0].confidence,
            isFinal: firstResult.isFinal
          }
        }),
        filter(({ isFinal }) => isFinal),
        scan((acc: Transcript[], { transcript, confidence } ) => 
          acc.concat({ 
            transcript,
            confidencePercentage: (confidence * percent).toFixed(2),
          }), []),
      );

    recognition.start();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

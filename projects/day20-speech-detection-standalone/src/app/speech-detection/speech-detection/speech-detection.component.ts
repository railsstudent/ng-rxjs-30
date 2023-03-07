import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { createRecognitionSubscription, createWordListObservable, recognition } from '../helpers/speech-detection.helper';

@Component({
  selector: 'app-speech-detection',
  standalone: true,
  imports: [
    AsyncPipe, 
    NgFor, 
    NgIf 
  ],
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
  subscription = createRecognitionSubscription();
  wordList$ = createWordListObservable();

  ngOnInit(): void {
    recognition.start();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

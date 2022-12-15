import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import { filter, fromEvent, map, Observable, scan, Subject, takeUntil, tap } from 'rxjs';
import { WINDOW } from '../../core';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-speech-detection',
  template: `<div class="words" contenteditable #words>
      <ng-container *ngIf="wordList$ | async as wordList">
        <p *ngFor="let word of wordList">{{word}}</p>
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
  @ViewChild('words', { static: true, read: ElementRef })
  words!: ElementRef<HTMLDivElement>;

  destroy$ = new Subject<void>();
  wordList$!: Observable<string[]>

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    fromEvent(recognition, 'end').pipe(
      tap(() => recognition.start()),
      takeUntil(this.destroy$)
    ).subscribe();

    this.wordList$ = fromEvent(recognition, 'result').pipe(
        map((e: any) =>  { 
          const transcript = Array.from(e.results)
            .map((result: any) => result[0].transcript)
            .join('');

            const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');

            return {
              transcript: poopScript,
              isFinal: e.results[0].isFinal as boolean
            }
        }),
        filter((result) => result.isFinal),
        map((result) => result.transcript),
        scan((acc, transcript) => acc.concat(transcript), [] as string[]),
      );

    recognition.start();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

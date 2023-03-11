import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, fromEvent, map, merge, tap } from 'rxjs';
import { PropertyName } from '../interfaces/speech.interface';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-speech-voice',
  template: `
    <ng-container>
      <select name="voice" id="voices" #voices>
        <option *ngFor="let voice of voices$ | async" [value]="voice.name">{{ voice.name }} ({{ voice.lang }})</option>
      </select>
      <label for="rate">Rate:</label>
      <input name="rate" type="range" min="0" max="3" value="1" step="0.1" #rate />
      <label for="pitch">Pitch:</label>
      <input name="pitch" type="range" min="0" max="2" step="0.1" #pitch value="1" />
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      input,
      select {
        width: 100%;
        display: block;
        margin: 10px 0;
        padding: 10px;
        border: 0;
        font-size: 2rem;
        background: #f7f7f7;
        outline: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechVoiceComponent implements OnInit, OnDestroy {
  @ViewChild('rate', { static: true, read: ElementRef })
  rate!: ElementRef<HTMLInputElement>;

  @ViewChild('pitch', { static: true, read: ElementRef })
  pitch!: ElementRef<HTMLInputElement>;

  @ViewChild('voices', { static: true, read: ElementRef })
  voiceDropdown!: ElementRef<HTMLSelectElement>;

  voices$!: Observable<SpeechSynthesisVoice[]>;
  subscription = new Subscription();

  constructor(private speechService: SpeechService) {}

  ngOnInit(): void {
    this.voices$ = fromEvent(speechSynthesis, 'voiceschanged').pipe(
      map(() => speechSynthesis.getVoices().filter((voice) => voice.lang.includes('en'))),
      tap((voices) => this.speechService.setVoices(voices)),
    );

    this.subscription.add(
      fromEvent(this.voiceDropdown.nativeElement, 'change')
        .pipe(tap(() => this.speechService.updateVoice(this.voiceDropdown.nativeElement.value)))
        .subscribe(),
    );

    this.subscription.add(
      merge(
        fromEvent(this.rate.nativeElement, 'change'),
        fromEvent(this.pitch.nativeElement, 'change')
      )
        .pipe(
          map((e) => e.target as HTMLInputElement),
          map((e) => ({ name: e.name as PropertyName, value: e.value })),
          tap((property) => this.speechService.updateSpeech(property)),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

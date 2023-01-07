import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-synthesis',
  template: `
    <div class="voiceinator">
      <h1>The Voiceinator 5000</h1>
      <app-speech-voice></app-speech-voice>
      <app-speech-text></app-speech-text>
    </div>`,
  styles: [`
    :host {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background-color: #3BC1AC;
      display: flex;
      min-height: 100vh;
      align-items: center;

      background-image:
      radial-gradient(circle at 100% 150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
      radial-gradient(circle at 0    150%, #3BC1AC 24%, #42D2BB 25%, #42D2BB 28%, #3BC1AC 29%, #3BC1AC 36%, #42D2BB 36%, #42D2BB 40%, transparent 40%, transparent),
      radial-gradient(circle at 50%  100%, #42D2BB 10%, #3BC1AC 11%, #3BC1AC 23%, #42D2BB 24%, #42D2BB 30%, #3BC1AC 31%, #3BC1AC 43%, #42D2BB 44%, #42D2BB 50%, #3BC1AC 51%, #3BC1AC 63%, #42D2BB 64%, #42D2BB 71%, transparent 71%, transparent),
      radial-gradient(circle at 100% 50%, #42D2BB 5%, #3BC1AC 6%, #3BC1AC 15%, #42D2BB 16%, #42D2BB 20%, #3BC1AC 21%, #3BC1AC 30%, #42D2BB 31%, #42D2BB 35%, #3BC1AC 36%, #3BC1AC 45%, #42D2BB 46%, #42D2BB 49%, transparent 50%, transparent),
      radial-gradient(circle at 0    50%, #42D2BB 5%, #3BC1AC 6%, #3BC1AC 15%, #42D2BB 16%, #42D2BB 20%, #3BC1AC 21%, #3BC1AC 30%, #42D2BB 31%, #42D2BB 35%, #3BC1AC 36%, #3BC1AC 45%, #42D2BB 46%, #42D2BB 49%, transparent 50%, transparent);
      background-size:100px 50px;
    }

    .voiceinator {
      padding: 2rem;
      width: 50rem;
      margin: 0 auto;
      border-radius: 1rem;
      position: relative;
      background: white;
      overflow: hidden;
      z-index: 1;
      box-shadow: 0 0 5px 5px rgba(0,0,0,0.1);
    }

    h1 {
      width: calc(100% + 4rem);
      margin: -2rem 0 2rem -2rem;
      padding: .5rem;
      background: #ffc600;
      border-bottom: 5px solid #F3C010;
      text-align: center;
      font-size: 5rem;
      font-weight: 100;
      font-family: 'Pacifico', cursive;
      text-shadow: 3px 3px 0 #F3C010;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechSynthesisComponent {}

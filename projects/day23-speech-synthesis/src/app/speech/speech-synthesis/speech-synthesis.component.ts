import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-speech-synthesis',
  template: ` <div class="voiceinator">
    <h1>The Voiceinator 5000</h1>
    <app-speech-voice></app-speech-voice>
    <app-speech-text></app-speech-text>
  </div>`,
  styles: [
    `
      :host {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        background-color: #3bc1ac;
        display: flex;
        min-height: 100vh;
        align-items: center;

        background-image: radial-gradient(
            circle at 100% 150%,
            #3bc1ac 24%,
            #42d2bb 25%,
            #42d2bb 28%,
            #3bc1ac 29%,
            #3bc1ac 36%,
            #42d2bb 36%,
            #42d2bb 40%,
            transparent 40%,
            transparent
          ),
          radial-gradient(
            circle at 0 150%,
            #3bc1ac 24%,
            #42d2bb 25%,
            #42d2bb 28%,
            #3bc1ac 29%,
            #3bc1ac 36%,
            #42d2bb 36%,
            #42d2bb 40%,
            transparent 40%,
            transparent
          ),
          radial-gradient(
            circle at 50% 100%,
            #42d2bb 10%,
            #3bc1ac 11%,
            #3bc1ac 23%,
            #42d2bb 24%,
            #42d2bb 30%,
            #3bc1ac 31%,
            #3bc1ac 43%,
            #42d2bb 44%,
            #42d2bb 50%,
            #3bc1ac 51%,
            #3bc1ac 63%,
            #42d2bb 64%,
            #42d2bb 71%,
            transparent 71%,
            transparent
          ),
          radial-gradient(
            circle at 100% 50%,
            #42d2bb 5%,
            #3bc1ac 6%,
            #3bc1ac 15%,
            #42d2bb 16%,
            #42d2bb 20%,
            #3bc1ac 21%,
            #3bc1ac 30%,
            #42d2bb 31%,
            #42d2bb 35%,
            #3bc1ac 36%,
            #3bc1ac 45%,
            #42d2bb 46%,
            #42d2bb 49%,
            transparent 50%,
            transparent
          ),
          radial-gradient(
            circle at 0 50%,
            #42d2bb 5%,
            #3bc1ac 6%,
            #3bc1ac 15%,
            #42d2bb 16%,
            #42d2bb 20%,
            #3bc1ac 21%,
            #3bc1ac 30%,
            #42d2bb 31%,
            #42d2bb 35%,
            #3bc1ac 36%,
            #3bc1ac 45%,
            #42d2bb 46%,
            #42d2bb 49%,
            transparent 50%,
            transparent
          );
        background-size: 100px 50px;
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
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
      }

      h1 {
        width: calc(100% + 4rem);
        margin: -2rem 0 2rem -2rem;
        padding: 0.5rem;
        background: #ffc600;
        border-bottom: 5px solid #f3c010;
        text-align: center;
        font-size: 5rem;
        font-weight: 100;
        font-family: 'Pacifico', cursive;
        text-shadow: 3px 3px 0 #f3c010;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechSynthesisComponent {}

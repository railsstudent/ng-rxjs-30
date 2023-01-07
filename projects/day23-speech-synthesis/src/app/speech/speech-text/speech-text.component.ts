import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-text',
  template: `
    <ng-container>
      <textarea name="text">Hello! I love JavaScript 👍</textarea>
      <button id="stop">Stop!</button>
      <button id="speak">Speak</button>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }

    button,
    textarea {
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
export class SpeechTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-voice',
  template: `
    <ng-container>
      <select name="voice" id="voices">
        <option value="">Select A Voice</option>
      </select>
      <label for="rate">Rate:</label>
      <input name="rate" type="range" min="0" max="3" value="1" step="0.1">
      <label for="pitch">Pitch:</label>
      <input name="pitch" type="range" min="0" max="2" step="0.1">
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
    }

    input, select {
      width: 100%;
      display: block;
      margin: 10px 0;
      padding: 10px;
      border: 0;
      font-size: 2rem;
      background: #F7F7F7;
      outline: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechVoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

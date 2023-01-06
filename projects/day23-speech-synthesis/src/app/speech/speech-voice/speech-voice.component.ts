import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-voice',
  templateUrl: './speech-voice.component.html',
  styleUrls: ['./speech-voice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechVoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

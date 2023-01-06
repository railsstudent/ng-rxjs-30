import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-text',
  templateUrl: './speech-text.component.html',
  styleUrls: ['./speech-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

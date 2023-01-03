import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speech-synthesis',
  templateUrl: './speech-synthesis.component.html',
  styleUrls: ['./speech-synthesis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechSynthesisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

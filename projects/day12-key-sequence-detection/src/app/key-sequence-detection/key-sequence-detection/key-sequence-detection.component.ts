import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-key-sequence-detection',
  templateUrl: './key-sequence-detection.component.html',
  styleUrls: ['./key-sequence-detection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeySequenceDetectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

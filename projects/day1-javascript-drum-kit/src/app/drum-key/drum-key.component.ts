import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Key } from '../interfaces';

@Component({
  selector: 'app-drum-key',
  templateUrl: './drum-key.component.html',
  styleUrls: ['./drum-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumKeyComponent implements OnInit {

  @Input()
  entry!: Key;

  constructor() { }

  ngOnInit(): void {
  }

}

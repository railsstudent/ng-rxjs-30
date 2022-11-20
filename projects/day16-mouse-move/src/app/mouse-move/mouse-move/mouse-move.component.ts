import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mouse-move',
  templateUrl: './mouse-move.component.html',
  styleUrls: ['./mouse-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MouseMoveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

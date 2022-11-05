import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

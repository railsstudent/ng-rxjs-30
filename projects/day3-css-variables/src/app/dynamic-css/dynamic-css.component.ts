import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dynamic-css',
  templateUrl: './dynamic-css.component.html',
  styleUrls: ['./dynamic-css.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCssComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

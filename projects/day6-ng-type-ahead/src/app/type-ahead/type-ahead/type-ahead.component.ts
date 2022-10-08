import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-type-ahead',
  templateUrl: './type-ahead.component.html',
  styleUrls: ['./type-ahead.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeAheadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stick-nav-page',
  templateUrl: './sticky-nav-page.component.html',
  styleUrls: ['./sticky-nav-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyNavPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

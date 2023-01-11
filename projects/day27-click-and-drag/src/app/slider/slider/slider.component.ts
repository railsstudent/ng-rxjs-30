import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  template: `
    <div class="items">
      <div *ngFor="let index of sliders" class="item">{{index}}</div>
    </div>
  `,
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {

  sliders = [...Array(25).keys()].map(i => i < 9 ? `0${i + 1}` : `${i + 1}`);

  constructor() { }

  ngOnInit(): void {
  }



}

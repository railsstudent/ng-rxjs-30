import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styles: [`
  .site-wrap {
    max-width: 700px;
    margin: 100px auto;
    background: white;
    padding: 40px;
    text-align: justify;
  }

  .align-left {
      float: left;
      margin-right: 20px;

      &.slide-in {
          transform: translateX(-30%) scale(0.95);
      }
  }

  .align-right {
      float: right;
      margin-left: 20px;

      .slide-in {
          transform: translateX(30%) scale(0.95);
      }
  }

  .slide-in {
      opacity: 0;
      transition: all .5s;

      &.active {
          opacity: 1;
          transform: translateX(0%) scale(1); 
      }
  }  
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

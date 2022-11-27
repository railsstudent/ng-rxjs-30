import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sorted-list',
  template: '<ul id="bands"></ul>',
  styles:[`
    :host {
      display: block;
    }

    #bands {
      list-style: inside square;
      font-size: 20px;
      background: white;
      width: 500px;
      margin: auto;
      padding: 0;
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.05);
    }
    
    #bands li {
      border-bottom: 1px solid #efefef;
      padding: 20px;
    }
    
    #bands li:last-child {
      border-bottom: 0;
    }

    a {
      color: #ffc600;
      text-decoration: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortedListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

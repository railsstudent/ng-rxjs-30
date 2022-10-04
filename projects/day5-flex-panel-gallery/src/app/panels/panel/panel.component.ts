import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-panel',
  template: `
    <div class="panel" #panel>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  @ViewChild('panel', { static: true })
  panel!: ElementRef<HTMLDivElement>;
  
  @Input()
  backgroundImage!: string;

  constructor() {}

  ngOnInit(): void {
    this.panel.nativeElement.style.setProperty('background-image', `url(${this.backgroundImage})`);
  }

}

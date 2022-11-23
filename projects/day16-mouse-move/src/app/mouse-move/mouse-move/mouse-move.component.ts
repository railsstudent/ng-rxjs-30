import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mouse-move',
  template: `
    <div class="hero">
      <h1 contenteditable>🔥WOAH!</h1>
    </div>
  `,
  styleUrls: ['./mouse-move.component.scss'],
  styles: [`
    :host { 
      display: block;
    }

    .hero {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
    }

    h1 {
      text-shadow: 10px 10px 0 rgba(0,0,0,1);
      font-size: 100px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MouseMoveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

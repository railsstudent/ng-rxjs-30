import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">0</span></h1>
    <button onClick="startGame()">Start!</button>
    <div class="game">
      <div class="hole hole1">
        <div class="mole"></div>
      </div>
      <div class="hole hole2">
        <div class="mole"></div>
      </div>
      <div class="hole hole3">
        <div class="mole"></div>
      </div>
      <div class="hole hole4">
        <div class="mole"></div>
      </div>
      <div class="hole hole5">
        <div class="mole"></div>
      </div>
      <div class="hole hole6">
        <div class="mole"></div>
      </div>
    </div>`,
  styles: [`
    h1 {
      text-align: center;
      font-size: 10rem;
      line-height: 1;
      margin-bottom: 0;
    }

    .score {
      background: rgba(255,255,255,0.2);
      padding: 0 3rem;
      line-height: 1;
      border-radius: 1rem;
    }

    .game {
      width: 600px;
      height: 400px;
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;
    }

    .hole {
      flex: 1 0 33.33%;
      overflow: hidden;
      position: relative;
    }

    .hole:after {
      display: block;
      background: url(dirt.svg) bottom center no-repeat;
      background-size: contain;
      content: '';
      width: 100%;
      height:70px;
      position: absolute;
      z-index: 2;
      bottom: -30px;
    }

    .mole {
      background: url('mole.svg') bottom center no-repeat;
      background-size: 60%;
      position: absolute;
      top: 100%;
      width: 100%;
      height: 100%;
      transition:all 0.4s;
    }

    .hole.up .mole {
      top: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

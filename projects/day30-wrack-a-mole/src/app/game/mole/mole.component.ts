import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

@Component({
  selector: 'app-mole',
  template: `
    <h1>Whack-a-mole! <span class="score">0</span></h1>
    <button onClick="startGame()">Start!</button>
    <div class="game">
      <div *ngFor="let id of [1, 2, 3, 4, 5, 6]" class="hole hole{{id}}" [style]="'--hole-image:' + holeSrc">
        <div class="mole" [style]="'--mole-image:' + moleSrc"></div>
      </div>
    </div>`,
  styleUrls: ['mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoleComponent implements OnInit {

  constructor(@Inject(APP_BASE_HREF) private baseHref: string) { }

  ngOnInit(): void {
  }

  get moleSrc(): string {
    return this.buildImage('mole.svg');
  }

  get holeSrc(): string {
    return this.buildImage('dirt.svg');
  }

  private buildImage(image: string) {
    const isEndWithSlash = this.baseHref.endsWith('/');
    const imagePath = `${this.baseHref}${isEndWithSlash ? '' : '/'}assets/images/${image}`;
    return `url('${imagePath}')`
  }

  // randomTime(min: number, max: number): number {
  //   return Math.round(Math.random() * (max - min) + min);
  // }

  // randomHole(holes) {
  //   const idx = Math.floor(Math.random() * holes.length);
  //   const hole = holes[idx];
  //   if (hole === lastHole) {
  //     console.log('Ah nah thats the same one bud');
  //     return this.randomHole(holes);
  //   }
  //   lastHole = hole;
  //   return hole;
  // }
}

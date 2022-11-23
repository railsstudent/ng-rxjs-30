import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { filter, fromEvent, map, Observable, startWith } from 'rxjs';
import { mapXYWalk } from '../custom-operators/mapXYWalk.operator';

@Component({
  selector: 'app-mouse-move',
  template: `
    <div class="hero" #hero>
      <ng-container *ngIf="textShadow$ | async as textShadow">
        <h1 contenteditable [style.textShadow]="textShadow">🔥WOAH!</h1>
      </ng-container>
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

  @ViewChild('hero', { static: true, read: ElementRef })
  hero!: ElementRef<HTMLDivElement>;

  textShadow$!: Observable<string>;
  
  ngOnInit(): void {
    const nativeElement = this.hero.nativeElement;

    this.textShadow$ = fromEvent(nativeElement, 'mousemove')
      .pipe(
        filter(e => e instanceof MouseEvent),
        map(e => e as MouseEvent),
        mapXYWalk(nativeElement),
        map(({ xWalk, yWalk }) => 
          (`
            ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
            ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
            ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
            ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
        `)),
        startWith('')
      ); 
  }
}

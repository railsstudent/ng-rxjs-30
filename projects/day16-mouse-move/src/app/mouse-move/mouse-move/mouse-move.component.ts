import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { filter, fromEvent, map, Observable, startWith } from 'rxjs';
import { mapTextShadowStyle } from '../custom-operators/mapTextShadowStyle.operator';

@Component({
  selector: 'app-mouse-move',
  template: `
    <div class="hero" #hero>
      <ng-container *ngIf="textShadow$ | async as textShadow">
        <h1 contenteditable [style.textShadow]="textShadow">🔥WOAH!</h1>
      </ng-container>
    </div>
  `,
  styles: [
    `
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
        text-shadow: 10px 10px 0 rgba(0, 0, 0, 1);
        font-size: 100px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseMoveComponent implements OnInit {
  @ViewChild('hero', { static: true, read: ElementRef })
  hero!: ElementRef<HTMLDivElement>;

  textShadow$!: Observable<string>;

  ngOnInit(): void {
    const nativeElement = this.hero.nativeElement;

    this.textShadow$ = fromEvent(nativeElement, 'mousemove').pipe(
      filter((e) => e instanceof MouseEvent),
      map((e) => e as MouseEvent),
      mapTextShadowStyle(nativeElement),
      startWith(''),
    );
  }
}

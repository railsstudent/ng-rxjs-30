import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, OnDestroy, Inject } from '@angular/core';
import { concatMap, filter, fromEvent, map, merge, scan, skip, Subject, takeUntil, tap } from 'rxjs';
import { WINDOW } from '../../core';
import { LineInfo } from '../interfaces';

@Component({
  selector: 'app-canvas',
  template: `<canvas width="800" height="800" #draw></canvas>`,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit, OnDestroy {

  @ViewChild('draw', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  direction = true;
  destroy$ = new Subject<void>();

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    if (this.canvas && this.canvas.nativeElement) {
      const nativeCanvas = this.canvas.nativeElement
      const ctx = nativeCanvas.getContext('2d');
      if (!ctx) {
        return;
      }

      nativeCanvas.width = this.window.innerWidth;
      nativeCanvas.height = this.window.innerHeight;
      ctx.strokeStyle = '#BADA55';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 100;

      const mouseDown$ = fromEvent(nativeCanvas, 'mousedown');
      const mouseMove$ = fromEvent(nativeCanvas, 'mousemove');
      const mouseOut$ = fromEvent(nativeCanvas, 'mouseout');
      const mouseUp$ = fromEvent(nativeCanvas, 'mouseup');
      const stopDrawing$ = merge(mouseOut$, mouseUp$);
      const drag$ = mouseMove$.pipe(takeUntil(stopDrawing$));

      mouseDown$.pipe(
        concatMap(
          () => drag$.pipe(
            filter(value => value instanceof MouseEvent),
            map(value => value as MouseEvent),
            scan((acc, value) => ({
              hue: acc.hue >= 360 ? 0 : acc.hue + 1,
              prev: acc.curr,
              curr: {
                offsetX: value.offsetX,
                offsetY: value.offsetY
              },
            }), { prev: undefined, curr: undefined, hue: -2 } as LineInfo),
            skip(1),
          ),
        ),
        tap(line => this.draw(ctx, line)),      
        takeUntil(this.destroy$)
      ).subscribe();
    }
  }

  draw(ctx: CanvasRenderingContext2D, line: LineInfo) {
    const { hue, prev, curr } = line;
    if (!curr || !prev) {
      return;
    }
    
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(prev.offsetX, prev.offsetY);
    // go to
    ctx.lineTo(curr.offsetX, curr.offsetY);
    ctx.stroke();

    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      this.direction = !this.direction;
    }

    ctx.lineWidth = ctx.lineWidth + (this.direction ? 1 : -1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

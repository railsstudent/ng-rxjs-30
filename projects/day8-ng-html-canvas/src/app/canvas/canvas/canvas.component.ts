import { JSDocTag } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas',
  template: `<<canvas width="800" height="800" #draw></canvas>`,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanvasComponent implements OnInit {

  @ViewChild('draw', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D | null = null;

  constructor() { }

  ngOnInit(): void {
    if (this.canvas && this.canvas.nativeElement) {
      const nativeCanvas = this.canvas.nativeElement
      this.ctx = nativeCanvas.getContext('2d');
      if (this.ctx) {
        nativeCanvas.width = window.innerWidth;
        nativeCanvas.height = window.innerHeight;
        this.ctx.strokeStyle = '#BADA55';
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 100;
      }
    }
  }
}

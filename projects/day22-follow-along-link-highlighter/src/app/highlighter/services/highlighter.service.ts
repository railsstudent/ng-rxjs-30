import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HighlighterStyle } from '../highlighter.interface';

@Injectable({
  providedIn: 'root'
})
export class HighlighterService {
  private readonly highlighterStyleSub = new Subject<HighlighterStyle>();
  readonly highlighterStyle$ = this.highlighterStyleSub.asObservable();

  updateStyle(style: HighlighterStyle) {
    this.highlighterStyleSub.next(style);
  }
}

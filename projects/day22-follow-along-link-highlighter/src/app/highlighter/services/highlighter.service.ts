import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HighlighterStyle } from '../highlighter.interface';

@Injectable({
  providedIn: 'root',
})
export class HighlighterService {
  private readonly highlighterStyleSub = new BehaviorSubject<HighlighterStyle>({
    width: '0px',
    height: '0px',
    transform: '',
  });
  readonly highlighterStyle$ = this.highlighterStyleSub.asObservable();

  updateStyle(style: HighlighterStyle) {
    this.highlighterStyleSub.next(style);
  }
}

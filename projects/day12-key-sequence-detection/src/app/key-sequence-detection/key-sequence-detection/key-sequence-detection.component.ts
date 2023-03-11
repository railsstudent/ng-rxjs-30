import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { filter, fromEvent, map, scan, Subject, takeUntil } from 'rxjs';
import { WINDOW } from '../../core';

// https://www.thepolyglotdeveloper.com/2016/01/include-external-javascript-libraries-in-an-angular-2-typescript-project/
declare var cornify_add: any;

@Component({
  selector: 'app-key-sequence-detection',
  template: ` <div><p>Type the secret code to display unicorn(s)!</p></div> `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeySequenceDetectionComponent implements OnInit, OnDestroy {
  readonly secretCode = 'wesbos';

  destroy$ = new Subject<void>();

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    fromEvent(this.window, 'keyup')
      .pipe(
        filter((e) => e instanceof KeyboardEvent),
        map((e) => e as KeyboardEvent),
        scan((acc, e) => {
          acc.push(e.key);
          acc.splice(
            -this.secretCode.length - 1,
            acc.length - this.secretCode.length
          );
          return acc;
        }, [] as string[]),
        map((acc) => acc.join('')),
        filter((inputtedCode) => inputtedCode.includes(this.secretCode)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => cornify_add());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

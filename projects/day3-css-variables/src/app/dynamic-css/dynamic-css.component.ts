import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { fromEvent, map, merge, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dynamic-css',
  template: `
    <ng-container>
      <h2>Update CSS Variables with <span class='hl'>JS</span></h2>
      <div class="controls">
        <label for="spacing">Spacing:</label>
        <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px" #control>

        <label for="blur">Blur:</label>
        <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px" #control>

        <label for="base">Base Color</label>
        <input id="base" type="color" name="base" value="#ffc600" #control>
      </div>
      <img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">
    </ng-container>
  `,
  styleUrls: ['./dynamic-css.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCssComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('control')
  inputElementList!: QueryList<ElementRef<HTMLInputElement>>;

  subscription!: Subscription;

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit(): void {
    const obsEvents$ = this.inputElementList.reduce((acc, elementRef) => {
      const inputElement = elementRef.nativeElement;
      return acc.concat(fromEvent(inputElement, 'change'), fromEvent(inputElement, 'mousemove'));
    }, [] as Observable<Event>[]);

    this.subscription = merge(...obsEvents$)
      .pipe(
        map(evt => {
          const target = evt.target as any;
          const { name, value, dataset } = target;
          const sizing = dataset?.sizing || ''
          return {
            name: `--${name}`,
            value: `${value}${sizing}`,
          }
        }),
      )
      .subscribe(({ name, value }) => this.hostElement.nativeElement.style.setProperty(name, value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, QueryList, ViewChildren, inject } from '@angular/core';
import { fromEvent, map, merge, Observable, Subscription } from 'rxjs';

const cssVariableUpdateFn = () => {
  const hostStyle = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.style;

  return (inputElements: QueryList<ElementRef<HTMLInputElement>>) => {
    const eventObservables$ = inputElements.reduce((acc, { nativeElement }) => 
      acc.concat(fromEvent(nativeElement, 'change'), fromEvent(nativeElement, 'mousemove'))
    , [] as Observable<Event>[]);
  
    return merge(...eventObservables$)
      .pipe(
        map(evt => {
          const target = evt.target as any;
          const sizing = target.dataset?.sizing || ''
          return {
            name: `--${target.name}`,
            value: `${target.value}${sizing}`,
          }
        }),
      )
      .subscribe(({ name, value }) => hostStyle.setProperty(name, value));
  }
}

@Component({
  selector: 'app-dynamic-css',
  standalone: true,
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
  styles: [`
    :host {
      display: block;

      text-align: center;
      background: #193549;
      color: white;
      font-family: 'helvetica neue', sans-serif;
      font-weight: 100;
      font-size: 50px;
      min-height: 100vh;

      --base: #ffc600;
      --spacing: 10px;
      --blur: 10px;
    }

    img {
      padding: var(--spacing);
      background: var(--base);
      filter: blur(var(--blur));
    }

    h2 {
      padding-top: 50px;
      padding-bottom: 50px;
    }

    .hl {
      color: var(--base);
    }

    .controls {
      margin-bottom: 50px;
    }

    input {
      width: 100px;
      margin-right: 16px;
      margin-left: 16px;
    }  
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCssComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('control')
  inputElementList!: QueryList<ElementRef<HTMLInputElement>>;

  subscription!: Subscription;
  cssVariableUpdater = cssVariableUpdateFn();

  ngAfterViewInit(): void {
    this.subscription = this.cssVariableUpdater(this.inputElementList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

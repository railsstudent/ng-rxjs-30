import { Component, OnInit, ChangeDetectionStrategy, ViewChildren, QueryList, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, map, merge, Observable, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-dynamic-css',
  templateUrl: './dynamic-css.component.html',
  styleUrls: ['./dynamic-css.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicCssComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('control')
  inputElementList!: QueryList<ElementRef<HTMLInputElement>>;
  destroy$ = new Subject<void>();

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit(): void {  
    const obsEvents$ = this.inputElementList.reduce((acc, elementRef) => {
      const inputElement = elementRef.nativeElement;
      return acc.concat(fromEvent(inputElement, 'change'), fromEvent(inputElement, 'mousemove'));
    }, [] as Observable<Event>[]);

    merge(...obsEvents$)
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
        tap(({ name, value }) => this.hostElement.nativeElement.style.setProperty(name, value)),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

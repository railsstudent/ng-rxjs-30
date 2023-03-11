import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';
import { PanelData } from './interfaces';

@Component({
  selector: 'app-panel',
  template: `
    <p>{{ panelData.headline1 }}</p>
    <p>{{ panelData.headline2 }}</p>
    <p>{{ panelData.headline3 }}</p>
  `,
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent implements OnInit, OnDestroy {
  @Input()
  panelData!: PanelData;

  @HostBinding('class.open') isOpen = false;

  @HostBinding('class.open-active') isOpenActive = false;

  subscription = new Subscription();

  constructor(
    private hostElement: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.hostElement.nativeElement.style.setProperty(
      'background-image',
      `url(${this.panelData.backgroundImage})`
    );

    this.subscription.add(
      fromEvent(this.hostElement.nativeElement, 'click')
        .pipe(
          tap(() => {
            this.isOpen = !this.isOpen;
            this.cdr.markForCheck();
          }),
        )
        .subscribe(),
    );

    this.subscription.add(
      fromEvent(this.hostElement.nativeElement, 'transitionend')
        .pipe(
          filter((evt) => evt instanceof TransitionEvent),
          map((evt) => evt as TransitionEvent),
          filter((evt) => evt.propertyName.includes('flex')),
          tap(() => {
            this.isOpenActive = this.isOpen;
            this.cdr.markForCheck();
          }),
        )
        .subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-panel',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, OnDestroy {
  
  @Input()
  backgroundImage!: string;

  @HostBinding('class.open')  isOpen = false;

  @HostBinding('class.open-active')  isOpenActive = false;
  
  subscription: Subscription = new Subscription();

  constructor(private hostElement: ElementRef) {}

  ngOnInit(): void {
    this.hostElement.nativeElement.style.setProperty('background-image', `url(${this.backgroundImage})`);

    this.subscription.add(
      fromEvent(this.hostElement.nativeElement, 'click')
        .pipe(tap(() => this.isOpen = !this.isOpen))
        .subscribe()
    );
    
    this.subscription.add(
      fromEvent(this.hostElement.nativeElement, 'transitionend')
        .pipe(
          filter(evt => evt instanceof TransitionEvent),
          map(evt => evt as TransitionEvent),
          filter(evt => evt.propertyName.includes('flex')),
          tap(() => this.isOpenActive = !this.isOpenActive)
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

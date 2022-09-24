import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, fromEvent, map, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-drum',
  templateUrl: './drum.component.html',
  styleUrls: ['./drum.component.scss']
})
export class DrumComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  allowedKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'keydown')
      .pipe(
        filter(evt => evt instanceof KeyboardEvent),
        map(evt => evt as KeyboardEvent),
        filter(({ key }) => ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].includes(key.toUpperCase())),
        tap(value => console.log(value)))
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

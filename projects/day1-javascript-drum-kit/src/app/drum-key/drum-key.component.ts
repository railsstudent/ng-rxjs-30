import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription, filter, fromEvent, map } from 'rxjs';
import { Key } from '../interfaces';
import { DrumService } from '../services';

@Component({
  standalone: true,
  selector: 'app-drum-key',
  template: `
    <ng-container>
      <kbd>{{ entry.key }}</kbd>
      <span class="sound">{{ entry.description }}</span>
      <audio [src]="soundFile" #audio></audio>
    </ng-container>
  `,
  styles: [`
    :host {
      display: block;
      border: .4rem solid black;
      border-radius: .5rem;
      margin: 1rem;
      font-size: 1.5rem;
      padding: 1rem .5rem;
      transition: all .07s ease;
      width: 10rem;
      text-align: center;
      color: white;
      background: rgba(0,0,0,0.4);
      text-shadow: 0 0 .5rem black;
    }

    :host(.playing) {
      transform: scale(1.1);
      border-color: #ffc600;
      box-shadow: 0 0 1rem #ffc600;
    }

    kbd {
      display: block;
      font-size: 4rem;
    }

    .sound {
      font-size: 1.2rem;
      text-transform: uppercase;
      letter-spacing: .1rem;
      color: #ffc600;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrumKeyComponent implements OnInit, OnDestroy {
  @Input()
  entry!: Key;

  @ViewChild('audio', { static: true })
  audio: ElementRef<HTMLAudioElement> | undefined;

  @HostBinding('class.playing') isPlaying = false;

  subscription = new Subscription();
  private drumService = inject(DrumService);
  private baseHref = inject(APP_BASE_HREF);
  private hostElement = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.subscription.add(
      this.drumService.playDrumKey$.pipe(
        filter(key => key === this.entry.key),
      )
      .subscribe(() => this.playSound())
    );

    this.subscription.add(
      fromEvent(this.hostElement.nativeElement, 'transitionend')
        .pipe(
          filter(evt => evt instanceof TransitionEvent),
          map(evt => evt as TransitionEvent),
          filter(evt => evt.propertyName === 'transform')
        )
        .subscribe(() => {
          this.isPlaying = false;
          this.cdr.markForCheck();
        })
    )
  }

  get soundFile() {
    const isEndWithSlash = this.baseHref.endsWith('/');
    return `${this.baseHref}${ isEndWithSlash ? '' : '/' }assets/sounds/${this.entry.description}.wav`;
  }

  playSound() {
    if (!this.audio) {
      return;
    }

    const nativeElement = this.audio.nativeElement;
    nativeElement.currentTime = 0;
    nativeElement.play();
    this.isPlaying = true;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { APP_BASE_HREF } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription, filter, fromEvent, map } from 'rxjs';
import { getHostNativeElement } from '../get-host-native-element';
import { Key } from '../interfaces';
import { DrumService } from '../services';

const getAppBaseRefFn = () => {
  const appBaseHref = inject(APP_BASE_HREF);
  const isEndWithSlash = appBaseHref.endsWith('/');
  const baseHref = `${appBaseHref}${ isEndWithSlash ? '' : '/' }`;
  return (description: string) => `${baseHref}assets/sounds/${description}.wav`;
}

const drumKeyTranstionEnd = () => 
  fromEvent(getHostNativeElement(), 'transitionend')
    .pipe(
      filter(evt => evt instanceof TransitionEvent),
      map(evt => evt as TransitionEvent),
      filter(evt => evt.propertyName === 'transform')
    );

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
  cdr = inject(ChangeDetectorRef);
  transitionEnd$ = drumKeyTranstionEnd();
  playKey$ = inject(DrumService).playDrumKey$.pipe(filter(key => key === this.entry.key));
  getAppBaseRef = getAppBaseRefFn();

  ngOnInit(): void {
    this.subscription.add(this.playKey$.subscribe(() => this.playSound()));

    this.subscription.add(
      this.transitionEnd$.subscribe(() => {
        this.isPlaying = false;
        this.cdr.markForCheck();
      })
    );
  }

  get soundFile() {
    return this.getAppBaseRef(this.entry.description);
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

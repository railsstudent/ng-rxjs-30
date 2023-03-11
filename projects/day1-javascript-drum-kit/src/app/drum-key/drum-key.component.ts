import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';
import { getFullAssetPath, getHostNativeElement } from '../helpers';
import { Key } from '../interfaces';
import { DrumService } from '../services';

const getSoundFileFn = () => {
  const assetPath = getFullAssetPath();
  return (description: string) => `${assetPath}sounds/${description}.wav`;
};

const drumKeyTranstionEnd = () =>
  fromEvent(getHostNativeElement(), 'transitionend').pipe(
    filter((evt) => evt instanceof TransitionEvent),
    map((evt) => evt as TransitionEvent),
    filter((evt) => evt.propertyName === 'transform'),
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
  styles: [
    `
      :host {
        display: block;
        border: 0.4rem solid black;
        border-radius: 0.5rem;
        margin: 1rem;
        font-size: 1.5rem;
        padding: 1rem 0.5rem;
        transition: all 0.07s ease;
        width: 10rem;
        text-align: center;
        color: white;
        background: rgba(0, 0, 0, 0.4);
        text-shadow: 0 0 0.5rem black;
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
        letter-spacing: 0.1rem;
        color: #ffc600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrumKeyComponent implements OnDestroy {
  @Input()
  entry!: Key;

  @ViewChild('audio', { static: true })
  audio: ElementRef<HTMLAudioElement> | undefined;

  @HostBinding('class.playing') isPlaying = false;

  cdr = inject(ChangeDetectorRef);
  playSoundSubscription = inject(DrumService)
    .playDrumKey$.pipe(filter((key) => key === this.entry.key))
    .subscribe(() => this.playSound());
  transitionSubscription = drumKeyTranstionEnd().subscribe(() => {
    this.isPlaying = false;
    this.cdr.markForCheck();
  });
  getSoundFile = getSoundFileFn();

  get soundFile() {
    return this.getSoundFile(this.entry.description);
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
    this.playSoundSubscription.unsubscribe();
    this.transitionSubscription.unsubscribe();
  }
}

import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, ViewChild, ElementRef, HostBinding, ChangeDetectorRef, HostListener, Inject } from '@angular/core';
import { filter, Subscription, tap } from 'rxjs';
import { Key } from '../interfaces';
import { DrumService } from '../services';

@Component({
  selector: 'app-drum-key',
  template: `
    <ng-container>
      <kbd>{{ entry.key }}</kbd>
      <span class="sound">{{ entry.description }}</span>
      <audio [src]="soundFile" #audio></audio>
    </ng-container>
  `,
  styleUrls: ['./drum-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrumKeyComponent implements OnInit, OnDestroy {
  @Input()
  entry!: Key;

  @ViewChild('audio', { static: true })
  audio: ElementRef<HTMLAudioElement> | undefined;
  
  @HostBinding('class.playing') isPlaying = false;

  subscription!: Subscription;

  constructor(private drumService: DrumService, private cdr: ChangeDetectorRef, @Inject(APP_BASE_HREF) private baseHref: string) {}

  ngOnInit(): void {
    this.subscription = this.drumService.playDrumKey$.pipe(
      filter(key => key === this.entry.key),
      tap(() => this.playSound())
    )
    .subscribe();
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

  @HostListener('transitionend', ['$event'])
  onTransitionEnd(evt: any) {
    if (evt.propertyName !== 'transform') {
      return;
    }
    this.isPlaying = false;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

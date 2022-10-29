import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerControlsComponent } from './video-player-controls.component';

describe('VideoPlayerControlsComponent', () => {
  let component: VideoPlayerControlsComponent;
  let fixture: ComponentFixture<VideoPlayerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayerControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

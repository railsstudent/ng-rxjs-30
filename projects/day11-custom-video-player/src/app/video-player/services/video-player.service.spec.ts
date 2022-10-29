import { TestBed } from '@angular/core/testing';

import { VideoPlayerService } from './video-player.service';

describe('VideoPlayerService', () => {
  let service: VideoPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

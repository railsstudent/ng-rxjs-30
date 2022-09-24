import { TestBed } from '@angular/core/testing';

import { DrumService } from './drum.service';

describe('DrumService', () => {
  let service: DrumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

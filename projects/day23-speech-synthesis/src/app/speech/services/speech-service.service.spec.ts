import { TestBed } from '@angular/core/testing';

import { SpeechServiceService } from './speech-service.service';

describe('SpeechServiceService', () => {
  let service: SpeechServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

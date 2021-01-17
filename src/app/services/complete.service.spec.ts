import { TestBed } from '@angular/core/testing';

import { CompleteService } from './complete.service';

describe('CompleteService', () => {
  let service: CompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

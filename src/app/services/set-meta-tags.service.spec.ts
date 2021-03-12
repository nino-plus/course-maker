import { TestBed } from '@angular/core/testing';

import { SetMetaTagsService } from './set-meta-tags.service';

describe('SetMetaTagsService', () => {
  let service: SetMetaTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetMetaTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

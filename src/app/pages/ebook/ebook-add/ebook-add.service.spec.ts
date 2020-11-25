import { TestBed } from '@angular/core/testing';

import { EbookAddService } from './ebook-add.service';

describe('EbookAddService', () => {
  let service: EbookAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

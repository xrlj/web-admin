import { TestBed } from '@angular/core/testing';

import { EbookListService } from './ebook-list.service';

describe('EbookListService', () => {
  let service: EbookListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

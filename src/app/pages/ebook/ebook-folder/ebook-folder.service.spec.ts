import { TestBed } from '@angular/core/testing';

import { EbookFolderService } from './ebook-folder.service';

describe('EbookFolderService', () => {
  let service: EbookFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbookFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

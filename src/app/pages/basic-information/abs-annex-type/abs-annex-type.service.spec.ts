import { TestBed } from '@angular/core/testing';

import { AbsAnnexTypeService } from './abs-annex-type.service';

describe('AbsAnnexTypeService', () => {
  let service: AbsAnnexTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsAnnexTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

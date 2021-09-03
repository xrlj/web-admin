import { TestBed } from '@angular/core/testing';

import { AgrTypeBigService } from './agr-type-big.service';

describe('AgrTypeBigService', () => {
  let service: AgrTypeBigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgrTypeBigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

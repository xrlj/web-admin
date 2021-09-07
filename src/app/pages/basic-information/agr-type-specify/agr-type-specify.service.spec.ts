import { TestBed } from '@angular/core/testing';

import { AgrTypeSpecifyService } from './agr-type-specify.service';

describe('AgrTypeSpecifyService', () => {
  let service: AgrTypeSpecifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgrTypeSpecifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

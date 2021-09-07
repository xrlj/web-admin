import { TestBed } from '@angular/core/testing';

import { AgrTypeService } from './agr-type.service';

describe('AgrTypeService', () => {
  let service: AgrTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgrTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

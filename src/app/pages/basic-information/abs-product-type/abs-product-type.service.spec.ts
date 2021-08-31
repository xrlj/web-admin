import { TestBed } from '@angular/core/testing';

import { AbsProductTypeService } from './abs-product-type.service';

describe('AbsProductTypeService', () => {
  let service: AbsProductTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsProductTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ZhAreaManageService } from './zh-area-manage.service';

describe('ZhAreaManageService', () => {
  let service: ZhAreaManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZhAreaManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

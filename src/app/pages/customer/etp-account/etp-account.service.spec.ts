import { TestBed } from '@angular/core/testing';

import { EtpAccountService } from './etp-account.service';

describe('EtpAccountService', () => {
  let service: EtpAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtpAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

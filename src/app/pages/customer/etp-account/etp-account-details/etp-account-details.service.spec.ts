import { TestBed } from '@angular/core/testing';

import { EtpAccountDetailsService } from './etp-account-details.service';

describe('EtpAccountDetailsService', () => {
  let service: EtpAccountDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtpAccountDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

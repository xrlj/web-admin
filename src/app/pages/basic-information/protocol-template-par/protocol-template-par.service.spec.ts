import { TestBed } from '@angular/core/testing';

import { ProtocolTemplateParService } from './protocol-template-par.service';

describe('ProtocolTemplateParService', () => {
  let service: ProtocolTemplateParService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtocolTemplateParService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

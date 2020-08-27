import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpAccountDetailsComponent } from './etp-account-details.component';

describe('EtpAccountDetailsComponent', () => {
  let component: EtpAccountDetailsComponent;
  let fixture: ComponentFixture<EtpAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpDetailsComponent } from './etp-details.component';

describe('EtpDetailsComponent', () => {
  let component: EtpDetailsComponent;
  let fixture: ComponentFixture<EtpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

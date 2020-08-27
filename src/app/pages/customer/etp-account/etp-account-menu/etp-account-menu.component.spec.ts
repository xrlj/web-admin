import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpAccountMenuComponent } from './etp-account-menu.component';

describe('EtpAccountMenuComponent', () => {
  let component: EtpAccountMenuComponent;
  let fixture: ComponentFixture<EtpAccountMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpAccountMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpAccountMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

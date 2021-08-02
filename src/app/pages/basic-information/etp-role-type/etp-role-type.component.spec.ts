import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpRoleTypeComponent } from './etp-role-type.component';

describe('EtpRoleTypeComponent', () => {
  let component: EtpRoleTypeComponent;
  let fixture: ComponentFixture<EtpRoleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpRoleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpRoleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

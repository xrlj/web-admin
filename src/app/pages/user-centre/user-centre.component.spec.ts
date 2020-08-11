import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCentreComponent } from './user-centre.component';

describe('UserCentreComponent', () => {
  let component: UserCentreComponent;
  let fixture: ComponentFixture<UserCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentManageComponent } from './department-manage.component';

describe('DepartmentManageComponent', () => {
  let component: DepartmentManageComponent;
  let fixture: ComponentFixture<DepartmentManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

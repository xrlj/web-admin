import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrTypeSpecifyComponent } from './agr-type-specify.component';

describe('AgrTypeSpecifyComponent', () => {
  let component: AgrTypeSpecifyComponent;
  let fixture: ComponentFixture<AgrTypeSpecifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrTypeSpecifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrTypeSpecifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

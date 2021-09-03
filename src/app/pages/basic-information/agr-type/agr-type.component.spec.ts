import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrTypeComponent } from './agr-type.component';

describe('AgrTypeComponent', () => {
  let component: AgrTypeComponent;
  let fixture: ComponentFixture<AgrTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

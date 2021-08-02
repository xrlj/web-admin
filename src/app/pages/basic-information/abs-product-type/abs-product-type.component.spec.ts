import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsProductTypeComponent } from './abs-product-type.component';

describe('AbsProductTypeComponent', () => {
  let component: AbsProductTypeComponent;
  let fixture: ComponentFixture<AbsProductTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsProductTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

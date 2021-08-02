import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsAnnexTypeComponent } from './abs-annex-type.component';

describe('AbsAnnexTypeComponent', () => {
  let component: AbsAnnexTypeComponent;
  let fixture: ComponentFixture<AbsAnnexTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsAnnexTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsAnnexTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

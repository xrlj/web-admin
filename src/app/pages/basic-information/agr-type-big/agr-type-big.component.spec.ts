import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgrTypeBigComponent } from './agr-type-big.component';

describe('AgrTypeBigComponent', () => {
  let component: AgrTypeBigComponent;
  let fixture: ComponentFixture<AgrTypeBigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgrTypeBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrTypeBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

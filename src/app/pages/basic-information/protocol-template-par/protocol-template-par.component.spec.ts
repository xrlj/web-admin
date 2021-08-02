import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolTemplateParComponent } from './protocol-template-par.component';

describe('ProtocolTemplateParComponent', () => {
  let component: ProtocolTemplateParComponent;
  let fixture: ComponentFixture<ProtocolTemplateParComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolTemplateParComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolTemplateParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookAddComponent } from './ebook-add.component';

describe('EbookAddComponent', () => {
  let component: EbookAddComponent;
  let fixture: ComponentFixture<EbookAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

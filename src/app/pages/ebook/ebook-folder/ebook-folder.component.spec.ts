import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookFolderComponent } from './ebook-folder.component';

describe('EbookFolderComponent', () => {
  let component: EbookFolderComponent;
  let fixture: ComponentFixture<EbookFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbookFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

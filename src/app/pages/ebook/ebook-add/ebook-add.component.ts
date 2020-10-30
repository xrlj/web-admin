import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ebook-add',
  templateUrl: './ebook-add.component.html',
  styleUrls: ['./ebook-add.component.less']
})
export class EbookAddComponent implements OnInit {

  addOrEditForm: FormGroup;
  selectCategoryList = [];
  selectCategory: string;

  constructor(private fb: FormBuilder) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      parentCategory: [null, [Validators.required]],
      bookName: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onChange($event: any) {
  }

}

import { Component, OnInit } from '@angular/core';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ebook-folder',
  templateUrl: './ebook-folder.component.html',
  styleUrls: ['./ebook-folder.component.less']
})
export class EbookFolderComponent implements OnInit {

  folderName = '';

  dataList: any;
  dataListOfExpandedData: { [key: string]: any[] } = {};
  isRefreshList = false;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;
  selectCategoryList = [];
  selectCategory: string;

  constructor(private fb: FormBuilder) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      nameZh: [null, [Validators.required]],
      nameEn: [null, [Validators.required]],
      parentCategory: [null, null]
    });
  }

  ngOnInit(): void {
  }

  resetAddOrEditModal(): void {
    this.isShowModal = false;
    this.dialogType = 1;
    this.isOkLoading = false;
    this.selectCategoryList = null;
    this.selectCategory = null;
    this.addOrEditForm.reset();
  }

  collapse(array: any[], data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  add(id?: any) {
    this.isShowModal = true;
  }

  edit(id: any) {

  }

  del(id: any) {

  }

  refreshList() {

  }

  handleCancel() {
    this.resetAddOrEditModal();
  }

  handleOk() {

  }

  onChange($event: any) {

  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const listData = [
  {
    title: 'aa',
    key: '11111',
    expanded: false,
    isLeaf: false,
    children: [
      {
        title: 'aabb',
        key: '4545444',
        expanded: false,
        isLeaf: true,
        children: []
      },
      {
        title: 'aarrrr',
        key: '456545454',
        expanded: false,
        isLeaf: false,
        children: []
      }
    ]
  },
  {
    title: 'bbb',
    key: '234324324',
    expanded: false,
    isLeaf: false,
    children: [
      {
        title: 'dddd',
        key: '4545444',
        expanded: false,
        isLeaf: true,
        children: []
      }
    ]
  },
  {
    title: 'cccc',
    key: '123223',
    expanded: false,
    isLeaf: false,
    children: [
      {
        title: 'fff',
        key: '4545444',
        expanded: false,
        isLeaf: true,
        children: []
      }
    ]
  }
]

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
    this.selectCategoryList = listData;
  }

  resetAddOrEditModal(): void {
    this.isShowModal = false;
    this.dialogType = 1;
    this.isOkLoading = false;
    this.selectCategoryList = [];
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

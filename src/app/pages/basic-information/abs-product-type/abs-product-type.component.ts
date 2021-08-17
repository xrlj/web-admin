import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';

interface VPdtType {
  key: string;
  expand: boolean;
  pdtTypeName: string;
  pdtTypeCode: string;
  pdtTypeSort: number;
  pdtTypeShow: number | string;
  pdtTypeDesc: string;
  templates: VPdtTypeTemplate[];
}

interface VPdtTypeTemplate {
  key: string;
  agrCode: string;
  agrName: string;
  agrBigTypeName: string;
  agrTypeName: string;
  agrSpecifyName: string;
  agrVersion: string;
  etpName: string;
}

// ABS产品类别管理
@Component({
  selector: 'app-abs-product-type',
  templateUrl: './abs-product-type.component.html',
  styleUrls: ['./abs-product-type.component.less']
})
export class AbsProductTypeComponent implements OnInit {

  productTypeName: string;

  listOfAllData: any[] = []; // 列表数据
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;
  editId: string; // 编辑记录id

  pdtTypeShow = true;


  vPdtTypes: VPdtType[] = [];

  constructor(private fb: FormBuilder) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      pdtTypeName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      pdtTypeCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      pdtTypeShow: [null, [Validators.required]],
      pdtTypeSort: [null, MyValidators.required]
    });
  }

  ngOnInit(): void {
    for (let i = 0; i < 3; ++i) {
      this.vPdtTypes.push({
        key: i.toString(),
        pdtTypeCode: `${i}_`,
        pdtTypeName: '',
        pdtTypeShow: '',
        pdtTypeSort: 0,
        pdtTypeDesc: '',
        templates: [
          {
            key: (i + 1).toString(),
            agrCode: '1',
            agrName: '',
            agrBigTypeName: '',
            agrTypeName: '',
            agrSpecifyName: '',
            agrVersion: '',
            etpName: ''
          },
          {
            key: (i + 1).toString(),
            agrCode: '2',
            agrName: '',
            agrBigTypeName: '',
            agrTypeName: '',
            agrSpecifyName: '',
            agrVersion: '',
            etpName: ''
          }
        ],
        expand: false
      });
    }
  }

  search(b: boolean = false) {

  }

  addOrEdit(id: string) {
    this.dialogType = 1;
    this.isShowModal = true;
  }

  del(id: string) {
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: any[]): void {
  }

  resetAddOrEditModal(): void {
    this.isShowModal = false;
    this.dialogType = 1;
    this.isOkLoading = false;
    this.addOrEditForm.reset();
  }

  handleCancel() {
    this.resetAddOrEditModal();
  }

  handleOk() {
    if (this.addOrEditForm.valid) {
      this.isOkLoading = true;
      if (this.dialogType === 1) { // 新增
        const value = this.addOrEditForm.value;
      } else { // 编辑
        const value = this.addOrEditForm.value;
      }
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }
}

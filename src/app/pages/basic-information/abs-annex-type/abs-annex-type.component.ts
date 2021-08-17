import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';

// 附件类型管理
@Component({
  selector: 'app-abs-annex-type',
  templateUrl: './abs-annex-type.component.html',
  styleUrls: ['./abs-annex-type.component.less']
})
export class AbsAnnexTypeComponent implements OnInit {

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

  annexTypeShow = true;

  constructor(private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      annexTypeName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      annexTypeCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      annexTypeSort: [null, [Validators.required]],
      annexTypeShow: [null, MyValidators.required]
    });
  }

  ngOnInit(): void {
  }

  currentPageDataChange($event: any[]): void {
  }

  search(b: boolean = false) {

  }

  addOrEdit(id: string) {
    this.dialogType = 1;
    this.isShowModal = true;
  }

  del(id: string) {
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

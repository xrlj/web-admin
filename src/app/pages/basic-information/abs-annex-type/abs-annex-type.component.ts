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

  constructor(private fb: FormBuilder ) {
    this.addOrEditForm = this.fb.group({
      annexTypeName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      annexTypeCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      annexTypeSort: [1, [Validators.required]],
      annexTypeShow: [true, MyValidators.required]
    });
  }

  ngOnInit(): void {
  }

  currentPageDataChange($event: any[]): void {
  }

  search(resetPageIndex: boolean = false) {
    if (resetPageIndex) this.pageIndex = 1;

    this.loading = true;
    // this.
  }

  add() {
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
    this.addOrEditForm.controls.annexTypeShow.setValue(true);
    this.addOrEditForm.controls.annexTypeSort.setValue(1);
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

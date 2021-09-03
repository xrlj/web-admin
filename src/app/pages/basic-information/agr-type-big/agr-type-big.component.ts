import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';

@Component({
  selector: 'app-agr-type-big',
  templateUrl: './agr-type-big.component.html',
  styleUrls: ['./agr-type-big.component.less']
})
export class AgrTypeBigComponent implements OnInit {

  bigName: string;

  listOfAllData: any[] = []; // 列表数据
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;

  details: any; // 详情

  constructor(private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      bigName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      bigCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      bigShow: [true, [Validators.required]],
      bigSort: [1, MyValidators.required]
    });
  }

  ngOnInit(): void {
  }

  search(reset?: boolean) {

  }

  add() {
    this.isShowModal = true;
    this.dialogType = 1;
  }

  edit(id) {

  }

  del(id) {

  }

  reInitModal() {
    this.dialogType = 1;
    this.isShowModal = false;
    this.details = null;
    this.addOrEditForm.reset();
    this.addOrEditForm.controls.bigShow.setValue(true);
    this.addOrEditForm.controls.bigSort.setValue(1);
  }

  handleOk(dialogType: number) {
    const body = this.addOrEditForm.value;
    if (dialogType === 2) {
      body.id = this.details.id;
    }
  }

  handleCancel() {
    this.reInitModal();
  }
}

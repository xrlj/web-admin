import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';
import {AgrTypeBigService} from './agr-type-big.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

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
  pageSize = 1;
  total = 0;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;

  details: any; // 详情

  constructor(private fb: FormBuilder, private agrTypeBigService: AgrTypeBigService,
              private uiHelper:UIHelper, private defaultBusService: DefaultBusService) {
    this.addOrEditForm = this.fb.group({
      bigName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      bigCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      bigShow: [true, [Validators.required]],
      bigSort: [1, MyValidators.required]
    });
  }

  ngOnInit(): void {
    this.search(true);
  }

  search(reset?: boolean) {
    if (reset) {
      this.pageIndex = 1;
    }

    // 参数
    const body: any = {pageIndex: this.pageIndex, pageSize: this.pageSize};
    body.bigName = this.bigName;

    this.loading = true ;
    this.agrTypeBigService.getListPage(body)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.loading = false;
      });
  }

  add() {
    this.isShowModal = true;
    this.dialogType = 1;
  }

  edit(id) {
    this.defaultBusService.showLoading(true);
    this.agrTypeBigService.get(id)
      .ok(data => {
        this.dialogType = 2;
        this.isShowModal = true;
        this.details = data;
        this.addOrEditForm.patchValue(data);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  del(id) {
    this.uiHelper.modalDel('确定删除？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.agrTypeBigService.delete(id)
          .ok(data => {
            setTimeout(() => {
              this.search(false);
            }, 100);
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      });
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
    if (this.addOrEditForm.valid) {
      const body = this.addOrEditForm.value;
      if (dialogType === 2) {
        body.id = this.details.id;
      }
      this.isOkLoading = true;
      this.agrTypeBigService.addOrUpdate(body)
        .ok(data => {
          this.reInitModal();
          setTimeout(() => {
            this.search(false);
          }, 100);
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.isOkLoading = false;
        });
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  handleCancel() {
    this.reInitModal();
  }
}

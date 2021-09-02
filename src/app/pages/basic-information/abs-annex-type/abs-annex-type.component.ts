import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';
import {AbsAnnexTypeService} from './abs-annex-type.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import set = Reflect.set;

// 附件类型管理
@Component({
  selector: 'app-abs-annex-type',
  templateUrl: './abs-annex-type.component.html',
  styleUrls: ['./abs-annex-type.component.less']
})
export class AbsAnnexTypeComponent implements OnInit {

  annexTypeName: string;

  listOfAllData: any[] = []; // 列表数据
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;

  details: any; // 性情

  constructor(private fb: FormBuilder, private absAnnexTypeService: AbsAnnexTypeService,
              private uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
    this.addOrEditForm = this.fb.group({
      annexTypeName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      annexTypeCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      annexTypeSort: [1, [Validators.required]],
      annexTypeShow: [true, MyValidators.required]
    });
  }

  ngOnInit(): void {
    this.search(true);
  }

  currentPageDataChange($event: any[]): void {
  }

  search(resetPageIndex: boolean = false) {
    if (resetPageIndex) this.pageIndex = 1;

    this.loading = true;
    const body: any = {};
    body.pageIndex = this.pageIndex;
    body.pageSize = this.pageSize;
    body.annexTypeName = this.annexTypeName;
    this.absAnnexTypeService.getListPage(body)
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
    this.dialogType = 1;
    this.isShowModal = true;
  }

  del(id: string) {
    this.defaultBusService.showLoading(true);
    this.absAnnexTypeService.delete(id)
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
      const value = this.addOrEditForm.value;
      if (this.dialogType === 2) { // 编辑
        value.id = this.details.id;
      }
      this.absAnnexTypeService.addOrUpdate(value)
        .ok(data => {
          this.resetAddOrEditModal();
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

  edit(id) {
    this.defaultBusService.showLoading(true);
    this.absAnnexTypeService.get(id)
      .ok(data => {
        this.details = data;
        this.dialogType = 2;
        this.isShowModal = true;
        this.addOrEditForm.patchValue(data);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }
}

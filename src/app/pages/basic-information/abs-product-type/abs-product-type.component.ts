import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';
import {AbsProductTypeService} from './abs-product-type.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {Utils} from '../../../helpers/utils';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {VPdtTypeResp} from '../../../helpers/vo/resp/v-pdt-type-resp';

// ABS产品类别管理
@Component({
  selector: 'app-abs-product-type',
  templateUrl: './abs-product-type.component.html',
  styleUrls: ['./abs-product-type.component.less']
})
export class AbsProductTypeComponent implements OnInit {

  productTypeName: string;

  vPdtTypeList: VPdtTypeResp[] = [];
  loading = false;
  pageIndex = 1;
  pageSize = 20;
  total = 0;

  isShowModal = false;
  dialogType = 1;
  isOkLoading = false;
  addOrEditForm: FormGroup;
  editId: string; // 编辑记录id

  details: VPdtTypeResp;

  constructor(private fb: FormBuilder, private absProductTypeService: AbsProductTypeService,
              private uiHelper: UIHelper, private utils: Utils,
              private defaultBusService: DefaultBusService) {
    // 新增对话框
    this.addOrEditForm = this.fb.group({
      pdtTypeName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      pdtTypeCode: [null, [MyValidators.required, MyValidators.maxLength(80), MyValidators.notChinese]],
      pdtTypeShow: [true, [Validators.required]],
      pdtTypeSort: [1, [MyValidators.required]],
      pdtTypeDesc: [null, null]
    });
  }

  ngOnInit(): void {
    this.search(false);
  }

  search(b: boolean = false) {
    if (b) this.pageIndex = 1;
    this.loading = true;

    // 参数
    const body: any = {};
    body.pageIndex = this.pageIndex;
    body.pageSize = this.pageSize;
    body.pdtTypeName =  this.productTypeName;

    this.absProductTypeService.getListPage(body)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.vPdtTypeList = data.list;
        this.setListPatch();
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(bb => {
        this.loading = false;
      });
  }

  setListPatch() {
    if (this.vPdtTypeList.length === 0) {
      return;
    }
    this.vPdtTypeList.forEach(item => {
      item.expand = false;
      item.key = item.id;
      item.templates = [];
    });
  }

  add() {
    this.dialogType = 1;
    this.isShowModal = true;
  }

  del(id: string) {
    this.defaultBusService.showLoading(true);
    this.absProductTypeService.delete(id)
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
    this.details = null;
    this.addOrEditForm.reset();
    this.addOrEditForm.controls.pdtTypeShow.setValue(true);
    this.addOrEditForm.controls.pdtTypeSort.setValue(1);
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
      this.absProductTypeService.addOrUpdate(value)
        .ok(data => {
          this.resetAddOrEditModal();
          setTimeout(() => {
            this.search();
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

  expandChange($event: boolean, id) {
    this.vPdtTypeList.forEach(item => {
      const _id = item.id;
      if (id === _id) {
        item.expand = $event;
      } else {
        item.expand = false;
      }
    });
  }

  edit(id: string) {
    this.defaultBusService.showLoading(true);
    this.absProductTypeService.get(id)
      .ok(data => {
        this.details = data;
        this.addOrEditForm.patchValue(this.details, {})
        this.isShowModal = true;
        this.dialogType = 2;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }
}

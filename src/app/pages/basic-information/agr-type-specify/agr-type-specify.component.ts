import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgrTypeService} from '../agr-type/agr-type.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {AgrTypeBigService} from '../agr-type-big/agr-type-big.service';
import {MyValidators} from '../../../helpers/MyValidators';
import {AgrTypeSpecifyService} from './agr-type-specify.service';

@Component({
  selector: 'app-agr-type-specify',
  templateUrl: './agr-type-specify.component.html',
  styleUrls: ['./agr-type-specify.component.less']
})
export class AgrTypeSpecifyComponent implements OnInit {

  agrTypeBigSelected = '';
  loadingAgrTypeBig = false;
  agrTypeBigListAll: any[]; // 所有大类列表

  agrTypeSelected = '';
  loadingAgrType = false;
  agrTypeListAll: any[];

  specifyTypeName: string;

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

  constructor(private fb: FormBuilder, private agrTypeService: AgrTypeService,
              private uiHelper:UIHelper, private defaultBusService: DefaultBusService,
              private agrTypeSpecifyService: AgrTypeSpecifyService, private agrTypeBigService: AgrTypeBigService) {
    this.addOrEditForm = this.fb.group({
      agrTypeId: [null, [MyValidators.required]],
      specifyName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      specifyCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      specifyShow: [true, [Validators.required]],
      specifySort: [1, MyValidators.required]
    });
  }

  ngOnInit(): void {
    this.getAgrTypeBigList();
  }

  search(reset?: boolean) {
    if (reset) {
      this.pageIndex = 1;
    }

    if (!this.agrTypeSelected) {
      this.uiHelper.msgTipWarning('请选择合同类型');
      return;
    }

    // 参数
    const par: any = {};
    par.pageIndex = this.pageIndex;
    par.pageSize = this.pageSize;
    par.agrTypeId = this.agrTypeSelected;
    par.specifyName = this.specifyTypeName;

    this.loading = true ;
    this.agrTypeSpecifyService.getListPage(par)
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

  getAgrTypeBigList() {
    this.loadingAgrTypeBig = true;
    this.agrTypeBigService.getListAll({})
      .ok(data => {
        this.agrTypeBigListAll = data;
        this.agrTypeBigSelected = data[0].id;
        this.getAgrTypeList(this.agrTypeBigSelected);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.loadingAgrTypeBig = false;
      });
  }

  getAgrTypeList(_agrTypeBigId: string) {
    this.loadingAgrType = true;
    this.agrTypeService.getListAll({agrTypeBigId: _agrTypeBigId})
      .ok(data => {
        this.agrTypeListAll = data;
        this.agrTypeSelected = data[0].id;
        this.loadingAgrType = false;
        this.search(true);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.loadingAgrType = false;
      });
  }

  add() {
    this.isShowModal = true;
    this.dialogType = 1;
  }

  edit(id) {
    this.defaultBusService.showLoading(true);
    this.agrTypeSpecifyService.get(id)
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
        this.agrTypeSpecifyService.delete(id)
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
    this.addOrEditForm.controls.specifyShow.setValue(true);
    this.addOrEditForm.controls.specifySort.setValue(1);
  }

  handleOk(dialogType: number) {
    if (this.addOrEditForm.valid) {
      const body = this.addOrEditForm.value;
      if (dialogType === 2) {
        body.id = this.details.id;
      }
      this.isOkLoading = true;
      this.agrTypeSpecifyService.addOrUpdate(body)
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

  bigTypeChange($event: any) {
    this.agrTypeBigSelected = $event;
    this.getAgrTypeList($event);
  }

  typeChange($event: any) {
    this.agrTypeSelected = $event;
    this.search(true);
  }

  refresh() {
    this.ngOnInit();
  }
}

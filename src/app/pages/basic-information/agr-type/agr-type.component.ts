import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AgrTypeBigService} from '../agr-type-big/agr-type-big.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {MyValidators} from '../../../helpers/MyValidators';
import {AgrTypeService} from './agr-type.service';

@Component({
  selector: 'app-agr-type',
  templateUrl: './agr-type.component.html',
  styleUrls: ['./agr-type.component.less']
})
export class AgrTypeComponent implements OnInit {

  agrTypeBigSelected = '';
  typeName: string;

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

  loadingAgrTypeBig = false;
  agrTypeBigListAll: any[]; // 所有大类列表

  constructor(private fb: FormBuilder, private agrTypeService: AgrTypeService,
              private uiHelper:UIHelper, private defaultBusService: DefaultBusService,
              private agrTypeBigService: AgrTypeBigService) {
    this.addOrEditForm = this.fb.group({
      agrTypeBigId: [null, [MyValidators.required]],
      typeName: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      typeCode: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      typeShow: [true, [Validators.required]],
      typeSort: [1, MyValidators.required]
    });
  }

  ngOnInit(): void {
    this.getAgrTypeBigList();
  }

  search(reset?: boolean) {
    if (reset) {
      this.pageIndex = 1;
    }

    // 参数
    const par: any = {};
    par.pageIndex = this.pageIndex;
    par.pageSize = this.pageSize;
    par.agrTypeBigId = this.agrTypeBigSelected;
    par.typeName = this.typeName;

    this.loading = true ;
    this.agrTypeService.getListPage(par)
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
        this.search(true);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.loadingAgrTypeBig = false;
      });
  }

  add() {
    this.isShowModal = true;
    this.dialogType = 1;
  }

  edit(id) {
    this.defaultBusService.showLoading(true);
    this.agrTypeService.get(id)
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
        this.agrTypeService.delete(id)
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
    this.addOrEditForm.controls.typeShow.setValue(true);
    this.addOrEditForm.controls.typeSort.setValue(1);
  }

  handleOk(dialogType: number) {
    if (this.addOrEditForm.valid) {
      const body = this.addOrEditForm.value;
      if (dialogType === 2) {
        body.id = this.details.id;
      }
      this.isOkLoading = true;
      this.agrTypeService.addOrUpdate(body)
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
    this.search(true);
  }
}

import {Component, OnInit} from '@angular/core';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';
import {AbsProductTypeService} from '../abs-product-type/abs-product-type.service';
import {ProtocolTemplateParService} from './protocol-template-par.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {UiTableHelper} from '../../../helpers/ui-table-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

// 协议模板参数管理
@Component({
  selector: 'app-protocol-template-par',
  templateUrl: './protocol-template-par.component.html',
  styleUrls: ['./protocol-template-par.component.less']
})
export class ProtocolTemplateParComponent implements OnInit {

  // 列表
  listData: any[];
  isListDataLoading = false;
  pageSize = 10;
  listOfExpandedData: { [key: string]: any[] } = {}; // 展开列表

  // ===新增、编辑对话框相关
  isShowAdd = false;
  dialogType = 1; // 1-新增；2-修改
  isAddOkLoading = false;
  addOrEditForm: FormGroup;

  // 详情
  details: any;

  /*=======新增编辑对话框上级参数选定=======*/
  selectKey: any;

  constructor(private fb: FormBuilder, private service: ProtocolTemplateParService,
              private uiHelper: UIHelper, private uiTableHelper: UiTableHelper,
              private defaultBusService: DefaultBusService) {
    this.addOrEditForm = this.fb.group({
      parNameCn: [null, [MyValidators.required, MyValidators.maxLength(80)]],
      parentId: [null, null],
      parName: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(50)]],
      parNameDb: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(50)]],
      parNameDesc: [null, [MyValidators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.isListDataLoading = true;
    this.service.getTreeListAll()
      .ok(data => {
        if (data) {
          this.listData = data;
          this.uiHelper.patchSelectTree(this.listData);
          this.listData.forEach((val) => {
            this.listOfExpandedData[val.key] = this.uiTableHelper.convertTreeToList(val);
          });
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.isListDataLoading = false;
      });
  }

  refresh() {
    this.ngOnInit();
  }

  resetModal() {
    this.dialogType = 1;
    this.isShowAdd = false;
    this.addOrEditForm.reset();
  }

  add() {
    this.dialogType = 1;
    this.isShowAdd = true;
  }

  collapse(array: any[], data: any, $event: boolean): void {
    this.uiTableHelper.collapse(array, data, $event);
  }

  addForCurrent(id) {
    this.dialogType = 1;
    this.isShowAdd = true;
    this.addOrEditForm.patchValue({parentId: id});
  }

  edit(id) {
    this.defaultBusService.showLoading(true);
    this.service.get(id)
      .ok(data => {
        this.details = data;
        this.dialogType = 2;
        this.isShowAdd = true;
        this.addOrEditForm.patchValue(this.details);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  del(id: string, title: string) {
    this.uiHelper.modalDel(`确定删除【${title}】?`)
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.service.del(id)
          .ok(data => {
            setTimeout(() => {
              this.search();
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

  handleCancel() {
    this.resetModal();
  }

  handleOk() {
    if (this.addOrEditForm.valid) {
      const body = this.addOrEditForm.value;
      if (this.dialogType === 2) { // 编辑
        body.id = this.details.id;
      }
      this.isAddOkLoading = true;
      this.service.addOrUpdate(body)
        .ok(data => {
          this.resetModal();
          this.search();
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        })
        .final(b => {
          this.isAddOkLoading = false;
        });
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  onChange($event: any) {
    console.log($event); // key
  }
}

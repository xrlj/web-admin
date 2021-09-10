import {Component, OnInit} from '@angular/core';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyValidators} from '../../../helpers/MyValidators';

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

  /*=======新增菜单对话的菜单类型选择=======*/
  selectList: any[];
  selectKey: any;

  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      parNameCn: [null, [Validators.required, MyValidators.maxLength(80)]],
      parent: [null, null],
      parName: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(50)]],
      parNameDb: [null, [MyValidators.required, MyValidators.notChinese, MyValidators.maxLength(50)]],
      parNameDesc: [null, [MyValidators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
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

  collapse(array: VMenuResp[], data: VMenuResp, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  addForCurrent(id) {

  }

  edit(id) {

  }

  del(id: string, title: string) {

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
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  onChange($event: any) {

  }
}

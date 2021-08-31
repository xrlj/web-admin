import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DictionaryTypeService} from './dictionary-type.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../../helpers/utils';
import {MyValidators} from '../../../../helpers/MyValidators';

@Component({
  selector: 'app-dictionary-type',
  templateUrl: './dictionary-type.component.html',
  styleUrls: ['./dictionary-type.component.less']
})
export class DictionaryTypeComponent implements OnInit {

  dictValue: number; // 搜索条件，字典值
  dictValueEnum: string; // 搜索条件，字典值
  dictLabel: string; // 搜索条件，字典标签

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  /*新增、编辑对话*/
  isShowModal = false;
  isModalOkLoading = false;
  modalType = 1; // 1-新增；2-编辑
  addOrEditForm: FormGroup;

  @Output() showType = new EventEmitter<number>();

  @Input() dictId: string;
  @Input() dictType: string;

  details: any; // 选定记录详情。

  // 排序
  sortOrder: string;
  sortField: string;

  constructor( private fb: FormBuilder,
               private dictionaryTypeService: DictionaryTypeService,
               private uiHelper: UIHelper, private utils: Utils,
               private defaultBusService: DefaultBusService) {
    this.addOrEditForm = this.fb.group({
      dictValue: [null, [Validators.required]],
      dictValueEnum: [null, [Validators.required, MyValidators.notChinese]],
      dictLabel: [null, [Validators.required]],
      isShow: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      remark: [null, null]
    });
  }

  ngOnInit() {
    this.search(true);
  }

  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }

    // 设置参数
    const body: any = {};
    body.pageIndex = this.pageIndex;
    body.pageSize = this.pageSize;
    body.universalDicId = this.dictId;
    body.dictValue = this.dictValue;
    body.dictValueEnum = this.dictValueEnum;
    body.dictLabel = this.dictLabel;
    this.utils.setListSearchSortPar(body, this.sortOrder, this.sortField);

    this.loading = true;
    this.dictionaryTypeService.getListPage(body)
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
    this.modalType = 1;
    this.isShowModal = true;
  }

  del(id?: string) {
    const checkIds: string[] = []; // 待删除
    if (id) {
      checkIds.push(id);
    } else { // 批量删除
      for (const key in this.mapOfCheckedId) {
        if (this.mapOfCheckedId[key]) {
          checkIds.push(key);
        }
      }
      if (checkIds.length === 0) {
        this.uiHelper.msgTipWarning('请选择!');
        return;
      }
    }
    this.defaultBusService.showLoading(true);
    this.dictionaryTypeService.delete(checkIds)
      .ok(data => {
        if (data) {
          this.mapOfCheckedId = {};
          setTimeout(() => {
            this.search();
          }, 100);
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  reInitModal() {
    this.modalType = 1;
    this.isShowModal = false;
    this.isModalOkLoading = false;
    this.addOrEditForm.reset();
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  handleCancel() {
    this.reInitModal();
  }

  handleOk() {
    if (this.addOrEditForm.valid) {
      this.isModalOkLoading = true;
      const body: any = this.addOrEditForm.value;
      body.universalDicId = this.dictId;
      if (this.modalType === 2) { // 编辑
        body.id = this.details.id;
      }
      this.dictionaryTypeService.addOrUpdate(body).ok(data => {
        if (data) {
          setTimeout(() => {
            this.search(false);
          }, 100);
        } else {
          this.uiHelper.msgTipError('操作失败');
        }
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(b => {
        if (b) {
          this.reInitModal();
        } else {
          this.isModalOkLoading = false;
        }
      });
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  back2Dictionary() {
    this.showType.emit(1);
  }

  edit(id: string) {
    this.defaultBusService.showLoading(true);
    this.dictionaryTypeService.get(id)
      .ok(data => {
        this.modalType = 2;
        this.isShowModal = true;
        this.addOrEditForm.patchValue(data);
        this.details = data;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.defaultBusService.showLoading(false);
      });
  }

  fieldSortHandler($event, fieldName) {
    if ($event) {
      this.sortOrder = $event;
      this.sortField = `${fieldName},id`;
      this.search(false);
    } else {
      this.sortOrder = null;
      this.sortField = null;
    }
  }
}

import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DictionaryService} from './dictionary.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.less']
})
export class DictionaryComponent implements OnInit {

  dictName: string; // 搜索条件，字典名称
  dictType: string; // 搜索条件，字典类型

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
  @Output() rowInfo = new EventEmitter<any>();

  details: any; // 选定记录详情

  constructor(private fb: FormBuilder, private dictionaryService: DictionaryService,
              private uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
    this.addOrEditForm = this.fb.group({
      dictName: [null, [Validators.required]],
      dictType: [null, [Validators.required]],
      dictSort: [null, [Validators.required]],
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
    this.loading = true;
    this.dictionaryService.getListPage(this.pageIndex, this.pageSize,
      this.dictName, this.dictType).ok(data => {
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
      this.total = data.total;
      this.listOfAllData = data.list;
    }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(b => {
      this.loading = false;
    });
  }


  addOrUpdate(id?: string) {
    if (id) { // 编辑
      this.defaultBusService.showLoading(true);
      this.dictionaryService.get(id).ok(data => {
        this.modalType = 2;
        this.isShowModal = true;
        this.details = data;
        this.addOrEditForm.patchValue(data);
      }).fail(error => {
        this.uiHelper.msgTipError(error.msg);
      }).final(b => {
        this.defaultBusService.showLoading(false);
      });
    } else { // 新增
      this.isShowModal = true;
      this.modalType = 1;
    }
  }

  del(id?: string) {
    const checkIds: string[] = []; // 待删除
    if (id) {
      checkIds.push(id);
    } else {
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
    this.dictionaryService.delete(checkIds)
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
    if (this.addOrEditForm.valid) { // 前端通过所有输入校验
      this.isModalOkLoading = true;
      const body: any = this.addOrEditForm.value;
      if (this.modalType === 2) { // 编辑
        body.id = this.details.id;
      }
      this.dictionaryService.addOrUpdate(body).ok(data => {
        if (data) {
          setTimeout(() => {
            this.search(true);
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

  showTypeUI(data: any) {
    this.showType.emit(2);
    this.rowInfo.emit(data);
  }
}

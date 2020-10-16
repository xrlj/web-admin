import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UIHelper} from '../../../helpers/ui-helper';
import {Utils} from '../../../helpers/utils';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {VCustomerEtpResp} from '../../../helpers/vo/resp/v-customer-etp-resp';
import {VCustomerEtpReq} from '../../../helpers/vo/req/v-customer-etp-req';
import {EtpManageService} from './etp-manage.service';
import {UserTypeEnum} from '../../../helpers/enum/user-type-enum';
import {ThemeHelper} from '../../../helpers/theme-helper';

@Component({
  selector: 'app-etp-manage',
  templateUrl: './etp-manage.component.html',
  styleUrls: ['./etp-manage.component.less']
})
export class EtpManageComponent implements OnInit {

  // tab
  tabIndex = 0;
  tabTitle = ['保理商', '核心企业', '成员公司', '供应商', '资金方'];

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VCustomerEtpResp[] = [];
  listOfAllData: VCustomerEtpResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数
  // 列表搜索条件
  etpSearchVo: VCustomerEtpReq = {};

  // 新增编辑对话框
  addOrEditForm: FormGroup;
  isShowAddOrEditModal = false;
  modalType = 1; // 1-新增；2-编辑
  isModalOkLoading = false;
  vCustomerEtpResp: VCustomerEtpResp; // 详情

  userType: number; // 企业类型。

  @Output()
  showVerifyCheckModal = false;

  constructor(private fb: FormBuilder, private etpManageService: EtpManageService,
              public uiHelper: UIHelper, private utils: Utils,
              private defaultBusService: DefaultBusService, public themeHelper: ThemeHelper) {
    // 新增编辑对话框
    this.addOrEditForm = this.fb.group({
      etpName: [null, [Validators.required]],
      unifyCode: [null, [Validators.required]],
      oriCode: [null, null],
      shortName: [null, null],
      telephone: [null, [Validators.required]],
      fax: [null, null],
      contactName: [null, [Validators.required]],
      contactMobile: [null, [Validators.required]],
      contactPhone: [null, null]
    });
  }

  ngOnInit() {
    this.search();
  }

  search(reset: boolean = false): void {
    reset ? this.etpSearchVo.pageIndex = 1 : this.etpSearchVo.pageIndex = this.pageIndex;
    this.etpSearchVo.pageSize = this.pageSize;
    this.setEtpType();
    this.etpSearchVo.userType = this.userType;
    this.utils.print(this.etpSearchVo);
    this.loading = true;
    this.etpManageService.getAllByAdmin(this.etpSearchVo)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(() => {
      this.loading = false;
    });
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VCustomerEtpResp[]): void {
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

  /**
   * 新增企业
   */
  addModalShow(modalType: number) {
    this.modalType = modalType;
    this.isShowAddOrEditModal = true;
    this.setEtpType();
  }

  /**
   * 转换设定企业类型。
   */
  private setEtpType(): void {
    switch (this.tabIndex) {
      case 0: // 保理商
        this.userType = UserTypeEnum.FACTOR;
        break;
      case 1: // 核心企业
        this.userType = UserTypeEnum.CORE;
        break;
      case 2:
        this.userType = UserTypeEnum.MEMBER;
        break;
      case 3:
        this.userType = UserTypeEnum.SUPPLIER;
        break;
      case 4:
        this.userType = UserTypeEnum.SPV;
        break;
      default:
    }
  }

  /**
   * 编辑
   * @param id 企业id
   */
  editEtp(id: any) {
  }

  /**
   * 新增或编辑对话框取消。
   * @param modalType 1-新增；2-编辑
   */
  handleCancel() {
    this.reInit();
  }

  /**
   * 新增或编辑确定。
   */
  handleOk(modalType: number) {
    if (this.addOrEditForm.valid) { // 前端通过所有输入校验
      const value = this.addOrEditForm.value;
      value.userType = this.userType;
      this.utils.print(`请求参数：${value}`);
      this.isModalOkLoading = true;
      if (modalType === 1) { // 新增
        this.etpManageService.addEtp(value).ok(data => {
          this.handleCancel();
          setTimeout(() => {
            this.search();
          }, 100);
          this.search(false);
        }).fail(error => {
          this.uiHelper.msgTipError(error.msg);
        }).final(() => {
          this.isModalOkLoading = false;
        });
      } else { // 编辑
      }
    } else {
      for (const key in this.addOrEditForm.controls) {
        this.addOrEditForm.controls[key].markAsDirty();
        this.addOrEditForm.controls[key].updateValueAndValidity();
      }
    }
  }

  /**
   * 重新初始化新增编辑对话框。
   */
  reInit() {
    this.modalType = 1;
    this.isShowAddOrEditModal = false;
    this.isModalOkLoading = false;
    this.addOrEditForm.reset();
  }

  /**
   * 企业实名认证审核。
   */
  verifyCheck() {
    this.showVerifyCheckModal = true;
  }

  verifyCheckHandleCancel() {
    this.showVerifyCheckModal = false;
  }

  verifyCheckHandleOk() {
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {VCustomerAccountResp} from '../../../helpers/vo/resp/v-customer-account-resp';
import {VCustomerAccountReq} from '../../../helpers/vo/req/v-customer-account-req';
import {UIHelper} from '../../../helpers/ui-helper';
import {FormBuilder} from '@angular/forms';
import {EtpAccountService} from './etp-account.service';
import {UserTypeEnum} from '../../../helpers/enum/user-type-enum';
import {ThemeHelper} from '../../../helpers/theme-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {EtpAccountMenuComponent} from './etp-account-menu/etp-account-menu.component';
import {UserStatusEnum} from '../../../helpers/enum/user-status-enum';
import {EtpAccountDetailsComponent} from './etp-account-details/etp-account-details.component';
import {EtpAccountDetailsService} from './etp-account-details/etp-account-details.service';

@Component({
  selector: 'app-etp-account',
  templateUrl: './etp-account.component.html',
  styleUrls: ['./etp-account.component.less']
})
export class EtpAccountComponent implements OnInit {

  userStatusEnum: typeof UserStatusEnum = UserStatusEnum;

  // tab
  tabIndex = 0;
  tabTitle = ['保理商', '核心企业', '成员公司', '供应商', '资金方'];

  // 表格
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: VCustomerAccountResp[] = [];
  listOfAllData: VCustomerAccountResp[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择角色
  numberOfChecked = 0;
  loading = false; // 列表加载等待指示器状态
  pageIndex = 1; // 页码
  pageSize = 10; // 每页条数
  total = 0; // 总条数

  // 列表搜索条件
  vCustomerAccountReq: VCustomerAccountReq = {pageIndex: this.pageIndex, pageSize: this.pageSize};

  userType: number;

  // 子组件
  @ViewChild(EtpAccountMenuComponent)
  etpAccountMenuComponent: EtpAccountMenuComponent;
  @ViewChild(EtpAccountDetailsComponent)
  etpAccountDetailsComponent: EtpAccountDetailsComponent;

  checkModalVisible = false;
  checkModalOkLoading = false;

  constructor(private fb: FormBuilder, public uiHelper: UIHelper,
              private etpAccountService: EtpAccountService, public themeHelper: ThemeHelper,
              private defaultBusService: DefaultBusService,
              private etpAccountDetailsService: EtpAccountDetailsService) {
  }

  ngOnInit() {
    this.search();
  }

  search(reset: boolean = false): void {
    reset ? this.vCustomerAccountReq.pageIndex = 1 : this.vCustomerAccountReq.pageIndex = this.pageIndex;
    this.vCustomerAccountReq.pageSize = this.pageSize;
    this.setUserType();
    this.vCustomerAccountReq.userType = this.userType;
    this.loading = true;
    this.etpAccountService.getEtpUserList(this.vCustomerAccountReq)
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
   * 转换设定企业类型。
   */
  private setUserType(): void {
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
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: VCustomerAccountResp[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.userId] = value));
    this.refreshStatus();
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.userId]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.userId]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.userId]).length;
  }

  /**
   * 查看详情。
   * @param id 账号id
   */
  details(id: any) {
  }

  /**
   * 设置企业管理员菜单权限
   * @param userId 用户id
   */
  setEtpMenus(userId: string, clientId: string, userType: UserTypeEnum) {
    this.etpAccountMenuComponent.editRole(userId, clientId, userType);
  }

  /**
   * 显示审核用户信息对话框
   * @param id 用户id
   */
  verifyCheck(id: string): void {
    this.etpAccountDetailsComponent.initData(id);
    this.checkModalVisible = true;
  }

  /**
   * 取消审核对话框。
   */
  checkHandleCancel() {
    this.etpAccountDetailsComponent.resetUI();
    this.checkModalVisible = false;
  }

  /**
   * 提交审核内容。
   */
  checkHandleOk() {
    this.etpAccountDetailsComponent.submitCheckInfo(this);
  }
}

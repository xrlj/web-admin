import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VMenuResp} from '../../../../helpers/vo/resp/v-menu-resp';
import {VDeptResp} from '../../../../helpers/vo/resp/v-dept-resp';
import {VRoleReq} from '../../../../helpers/vo/req/v-role-req';
import {JwtKvEnum} from '../../../../helpers/enum/jwt-kv-enum';
import {Constants} from '../../../../helpers/constants';
import {Utils} from '../../../../helpers/utils';
import {UIHelper} from '../../../../helpers/ui-helper';
import {EtpAccountService} from '../etp-account.service';
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import {DefaultBusService} from '../../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-etp-account-menu',
  templateUrl: './etp-account-menu.component.html',
  styleUrls: ['./etp-account-menu.component.less']
})
export class EtpAccountMenuComponent implements OnInit {

  // 新增、编辑对话框
  isShowDialog = false;
  isAddOkLoading = false;
  addOrEditForm: FormGroup;
  checkedKeys = []; // 选中的key
  checkedMenuIds = []; // 选中的菜单的id
  expandedKeys = []; // 展开的
  nzTreeMenusData: VMenuResp[] = [];

  roleList = [];
  roleId = '';
  clientId = '';

  constructor(private utils: Utils, private uiHelper: UIHelper,
              private etpAccountService: EtpAccountService, private defaultBusService: DefaultBusService,
              private fb: FormBuilder) {
    this.addOrEditForm = this.fb.group({
      roleName: [{value: '', disabled: true}, [Validators.required]],
      roleDesc: [{value: '', disabled: true}, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  /**
   * 编辑修改角色。
   * @param id 角色id
   */
  editRole(userId: string, clientId: string): void {
    this.defaultBusService.showLoading(true);
    this.etpAccountService.getRoleInfoByUserId(userId)
      .ok(data => {
        if (data) {
          this.roleList = data;
          this.roleId = this.roleList[0].roleId;
          this.clientId = clientId;
          this.showDialog(this.roleId, clientId);
        } else {
          this.defaultBusService.showLoading(false);
        }
      }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(b => {
      if (!b) {
        this.defaultBusService.showLoading(false);
      }
    });
  }

  showDialog(roleId: string, clientId: string) {
    this.etpAccountService.getRoleInfo(roleId)
      .ok(data => {
        this.isShowDialog = true;
        this.addOrEditForm.patchValue({
          roleName: data.roleName,
          roleDesc: data.description
        });
        // 设置菜单授权
        this.etpAccountService.getMenusByClientId(clientId, 0)
          .ok(data1 => {
            this.nzTreeMenusData = data1;
            // 设置选中
            this.checkedKeys = [];
            data.roleMenu.forEach(value => {
              if (value.checked) {
                this.checkedKeys.push(value.menuKey);
              }
              this.checkedMenuIds.push(value.menuId);
            });
            this.uiHelper.setMenuPerDataLeaf(this.nzTreeMenusData);
          }).fail(error => {
        }).final(b => {
            this.defaultBusService.showLoading(false);
        });
      }).fail(error => {
      this.uiHelper.msgTipError(error.msg);
    }).final(b => {
      if (!b) {
        this.defaultBusService.showLoading(false);
      }
    });
  }

  /**
   * 取消新增或者编辑。
   */
  handleCancelDialog(): void {
    this.isShowDialog = false;
    this.reInitDialog();
  }

  handleOkDialog(): void {
    // 检查必填值
    for (const i in this.addOrEditForm.controls) {
      this.addOrEditForm.controls[i].markAsDirty();
      this.addOrEditForm.controls[i].updateValueAndValidity();
    }
    const vRoleReq: VRoleReq = {
      enterpriseId: this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId),
      clientId: this.clientId,
      roleName: this.addOrEditForm.value.roleName,
      description: this.addOrEditForm.value.roleDesc,
      menuIds: this.checkedMenuIds,
      roleId: this.roleId
    };
    this.isAddOkLoading = true;
    this.etpAccountService.updateRole(vRoleReq)
      .ok(data => {
        if (data) {
          this.uiHelper.msgTipSuccess('修改成功');
          this.isShowDialog = false;
          this.reInitDialog();
        }
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.isAddOkLoading = false;
      });
  }

  reInitDialog(): void {
    this.addOrEditForm.reset();
    this.checkedKeys = [];
    this.expandedKeys = [];
    this.checkedMenuIds = [];
    this.nzTreeMenusData = [];
  }

  nzTreeMenusClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  /**
   * 选中菜单。
   * @param event 对象
   */
  nzTreeMenusCheck(event: NzFormatEmitEvent): void {
    if (event.checkedKeys) {
      console.log(event.checkedKeys);
      this.checkedKeys = [];
      this.checkedMenuIds = [];
      event.checkedKeys.forEach(value => {
        this.uiHelper.dealNzTreeCheck(value, this.checkedKeys, this.checkedMenuIds);
      });
      // 去重
      this.checkedKeys = this.utils.removeRepeatOfArray<string>(this.checkedKeys);
      this.checkedMenuIds = this.utils.removeRepeatOfArray<string>(this.checkedMenuIds);
    }
  }

}

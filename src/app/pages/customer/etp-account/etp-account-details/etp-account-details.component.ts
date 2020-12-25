import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../../helpers/common.service';
import {UserStatusEnum} from '../../../../helpers/enum/user-status-enum';
import {EtpAccountDetailsService} from './etp-account-details.service';
import {EtpAccountComponent} from '../etp-account.component';

@Component({
  selector: 'app-etp-account-details',
  templateUrl: './etp-account-details.component.html',
  styleUrls: ['./etp-account-details.component.less']
})
export class EtpAccountDetailsComponent implements OnInit {

  userStatusEnum: typeof UserStatusEnum = UserStatusEnum;

  userInfo: any; // 用户信息
  etpInfo: any; // 企业信息

  checkStatus = UserStatusEnum.CHECK_PASS;
  failReason: string | null = null;

  constructor(private commonService: CommonService,
              private etpAccountDetailsService: EtpAccountDetailsService) {
  }

  ngOnInit(): void {
  }

  /**
   * 获取会员信息，会员所属企业初始化信息。
   * @param userId 用户id
   */
  initData(userId: string): void {
    this.commonService.getUserInfoById(userId)
      .ok(data => {
        console.log(data);
        this.userInfo = data;
      });

    this.commonService.getEtpInfoByUser(userId)
      .ok(data => {
        this.etpInfo = data;
      });
  }

  resetUI(): void {
    this.checkStatus = UserStatusEnum.CHECK_PASS;
    this.failReason = null;
    this.userInfo = null;
    this.etpInfo = null;
  }

  /**
   * 提交审核信息。
   */
  submitCheckInfo(instance: EtpAccountComponent): void {
    const body = {id: this.userInfo.userId, userStatus: this.checkStatus, failReason: this.failReason};
    console.log(body);
    instance.checkModalOkLoading = true;
    this.etpAccountDetailsService.saveCheckUserSeal(body)
      .ok(data => {
        console.log(`>>>>>${data}`);
        if (data) {
          setTimeout(() => {
            instance.search();
          }, 200);
        }
      })
      .fail(error => {
        instance.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        instance.checkModalOkLoading = false;
        if (b) {
          instance.checkModalVisible = false;
        }
      });
  }
}

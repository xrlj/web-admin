import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../../helpers/common.service';

@Component({
  selector: 'app-etp-account-details',
  templateUrl: './etp-account-details.component.html',
  styleUrls: ['./etp-account-details.component.less']
})
export class EtpAccountDetailsComponent implements OnInit {

  userInfo: any; // 用户信息
  etpInfo: any; // 企业信息

  checkStatus = '1';
  failReason: string | null = null;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

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

}

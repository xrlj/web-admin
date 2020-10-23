import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {EtpManageService} from '../etp-manage.service';
import {UIHelper} from '../../../../helpers/ui-helper';
import {VCustomerEtpResp} from '../../../../helpers/vo/resp/v-customer-etp-resp';

@Component({
  selector: 'app-etp-details',
  templateUrl: './etp-details.component.html',
  styleUrls: ['./etp-details.component.less']
})
export class EtpDetailsComponent implements OnInit {

  @Input() etpId?: string;

  etpInfo: any;
  bankCardInfo: any; // 对公银行信息

  checkStatus = '3';
  failReason: string | null = null;

  constructor(private etpManageService: EtpManageService, private uiHelper: UIHelper) {
  }

  ngOnInit(): void {
    this.etpManageService.getEtpInfo(this.etpId)
      .ok(data => {
        this.etpInfo = data;
        this.bankCardInfo = this.etpInfo.extra.bankCardList.find(item => item.defaultCard === true);
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
      });
  }
}

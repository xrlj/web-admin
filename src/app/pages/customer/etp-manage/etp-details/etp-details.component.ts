import {Component, Input, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-etp-details',
  templateUrl: './etp-details.component.html',
  styleUrls: ['./etp-details.component.less']
})
export class EtpDetailsComponent implements OnInit {

  @Input() etpId?: string;

  @Input()
  etpInfo: any; // 企业信息
  @Input()
  bankCardInfo: any; // 对公银行信息

  checkStatus = '1';
  failReason: string | null = null;

  constructor(private modal: NzModalRef) {
  }

  ngOnInit(): void {
  }

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }

}

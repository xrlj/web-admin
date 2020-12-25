import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class EtpAccountDetailsService {

  constructor(private api: Api) { }

  /**
   * 审核企业账号信息。
   */
  saveCheckUserSeal(body: any): any {
    return this.api.post(ApiPath.usercentral.userApi.saveCheckUserSeal, body);
  }
}

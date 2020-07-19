import {Injectable} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Utils} from '../../../helpers/utils';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class EtpManageService {

  constructor(private api: Api, private utils: Utils) { }

  /**
   * 新增企业。
   * @param body 请求json对象。
   */
  addEtp(body: any): any {
    return this.api.post(ApiPath.usercentral.enterpriseApi.add, body);
  }
}

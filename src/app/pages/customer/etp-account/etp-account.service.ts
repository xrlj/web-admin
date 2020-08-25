import {Injectable} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class EtpAccountService {

  constructor(private api: Api) { }

  /**
   * 分页查询企业用户列表。
   * @param body 参数
   */
  getEtpUserList(body: any): any {
    return this.api.post(ApiPath.usercentral.userApi.getEtpUserList, body);
  }
}

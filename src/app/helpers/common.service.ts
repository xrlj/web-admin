import {Injectable} from '@angular/core';
import {ApiPath} from '../api-path';
import {Api} from './http/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private api: Api) { }

  /**
   * 获取所有应用。
   * @param appType1 应用类型。
   */
  getAllAppList(appType1?: number): any {
    if (appType1 === null || appType1 === undefined) {
      return  this.api.get(ApiPath.usercentral.appInfoApi.getAll);
    } else {
      const par = {appType: appType1};
      return this.api.get(ApiPath.usercentral.appInfoApi.getAll, par);
    }
  }

  /**
   * 获取用户信息。
   * @param userId 用户id
   */
  getUserInfoById(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.userApi.getUserInfoById}/${userId}`);
  }

  /**
   * 获取用户所属企业信息。
   * @param userId 用户id
   */
  getEtpInfoByUser(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.enterpriseApi.getEtpInfoByUser}/${userId}`);
  }
}

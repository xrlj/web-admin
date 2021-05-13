import {Injectable} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VRoleReq} from '../../../helpers/vo/req/v-role-req';

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

  /**
   * 更新角色信息。
   * @param vRoleReq 参数对象
   */
  updateRole(vRoleReq: VRoleReq): any {
    return this.api.post(ApiPath.usercentral.roleApi.update, vRoleReq);
  }

  /**
   * 获取角色详情。包含其菜单授权列表，接口授权列表。
   * @param roleId 菜单id
   */
  getRoleInfo(roleId: string): any {
    return this.api.get(`${ApiPath.usercentral.roleApi.getById}/${roleId}`);
  }

  /**
   * 获取用户角色。
   */
  getRoleInfoByUserId(userId: string): any {
    return this.api.get(`${ApiPath.usercentral.userApi.getRolesByUserId}/${userId}`);
  }

  /**
   * 根据clientId获取该应用下所有菜单。
   */
  getMenusByClientId(_clientId: string, _type: number, _userType: number): any {
    const body = {
      clientId: _clientId,
      type: _type,
      userType: _userType
    };
    return this.api.post(`${ApiPath.usercentral.menuApi.getMenuList}`, body);
  }
}

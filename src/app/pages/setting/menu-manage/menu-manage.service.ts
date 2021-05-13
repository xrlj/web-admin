import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {VMenuReq} from '../../../helpers/vo/req/v-menu-req';
import {UserTypeEnum} from '../../../helpers/enum/user-type-enum';

@Injectable({
  providedIn: 'root'
})
export class MenuManageService {

  constructor(private api: Api) { }

  /**
   * 保存、编辑菜单。
   * @param body 参数体。
   */
  saveOrUpdate(body: VMenuReq): any {
    return this.api.post(ApiPath.usercentral.menuApi.saveOrUpdate, body);
  }

  /**
   * 根据clientId获取该应用下所有菜单。
   * @param _clientId 应用id。
   * @param _type 菜单类型。0-获取所有菜单和按钮;1-菜单; 2-按钮
   * @param _userType 平台类型
   */
  getMenuList(_clientId: string, _type: number, _userType?: UserTypeEnum): any {
    const body = {
      clientId: _clientId,
      type: _type,
      userType: _userType
    };
    return this.api.post(`${ApiPath.usercentral.menuApi.getMenuList}`, body);
  }

  /**
   * 删除菜单。
   * @param menuId 菜单id。
   */
  delMenuById(menuId: string): any {
    const par = {
      id: menuId
    };
    return this.api.post(ApiPath.usercentral.menuApi.delById, par);
  }

  /**
   * 获取菜单详情。
   * @param menuId 菜单id
   */
  getMenuById(menuId: string): any {
    return this.api.get(`${ApiPath.usercentral.menuApi.getById}/${menuId}`);
  }
}

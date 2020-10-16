import { Injectable } from '@angular/core';
import {ApiPath} from '../../../api-path';
import {Api} from '../../../helpers/http/api';

@Injectable({
  providedIn: 'root'
})
export class ZhAreaManageService {

  constructor(private api: Api) { }

  /**
   * 省份直辖市列表。
   */
  getProvinceList(): any {
    return this.api.get(`${ApiPath.syscommon.areaDic.getProvinceList}`);
  }

  /**
   * 获取其下级数据列表。
   * @param parentId 父级id
   */
  getChildrenList(parentId: string): any {
    return this.api.get(`${ApiPath.syscommon.areaDic.getChildrenList}/${parentId}`);
  }
}

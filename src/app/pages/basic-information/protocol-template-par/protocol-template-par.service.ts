import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class ProtocolTemplateParService {

  constructor(private api: Api) { }

  /**
   * 新增或者更新。
   */
  addOrUpdate(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.templateParManage.addOrUpdate, body);
  }

  /**
   * 获取所有树形结构展示。
   */
  getTreeListAll(): any {
    return this.api.get(ApiPath.serviceAbsTemplate.templateParManage.getTreeListAll);
  }
}

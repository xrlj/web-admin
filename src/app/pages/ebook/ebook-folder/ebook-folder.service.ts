import {Injectable} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {Utils} from '../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class EbookFolderService {

  constructor(private api: Api, private utils: Utils) { }

  /**
   * 添加保存。
   */
  save(body: any): any {
    return this.api.post(ApiPath.serviceebook.bookMenu.save, body);
  }

  /**
   * 更新。
   */
  update(body: any): any {
    return this.api.post(ApiPath.serviceebook.bookMenu.update, body);
  }

  /**
   * 批量删除。
   */
  del(...ids: string[]): any {
    const idsParam = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceebook.bookMenu.delete}/${idsParam}`);
  }

  /**
   * 获取全部。树形列表。
   */
  getListTree(params: any): any {
    return this.api.get(ApiPath.serviceebook.bookMenu.getListTree, params);
  }
}

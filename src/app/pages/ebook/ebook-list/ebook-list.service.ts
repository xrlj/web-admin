import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {Utils} from '../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class EbookListService {

  constructor(private api: Api, private utils: Utils) { }

  /**
   * 列表查询。
   */
  getListPage(body: any): any {
    return this.api.post(ApiPath.serviceebook.bookInfo.getListPage, body);
  }

  delete(...ids: any[]): any {
    const idsPar = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceebook.bookInfo.delete}/${idsPar}`);
  }
}

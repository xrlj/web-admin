import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class EbookAddService {

  constructor(private api: Api) { }

  /**
   * 添加保存。
   */
  save(body: any): any {
    return this.api.post(ApiPath.serviceebook.bookInfo.save, body);
  }

  /**
   * 更新。
   */
  update(body: any): any {
    return this.api.post(ApiPath.serviceebook.bookInfo.update, body);
  }
}

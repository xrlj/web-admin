import { Injectable } from '@angular/core';
import {Api} from '../../../../helpers/http/api';
import {ApiPath} from '../../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private api: Api) { }

  addOrUpdate(body: any): any {
    return this.api.post(ApiPath.syscommon.universalDic.addOrUpdate, body);
  }

  getListPage(pageIndex: number, pageSize: number, dictName: string, dictType: string): any {
    const body: any = {};
    body.pageIndex = pageIndex;
    body.pageSize = pageSize;
    body.dictName = dictName;
    body.dictType = dictType;
    return this.api.post(ApiPath.syscommon.universalDic.getListPage, body);
  }

  get(id: string): any {
    return this.api.get(`${ApiPath.syscommon.universalDic.get}/${id}`);
  }
}

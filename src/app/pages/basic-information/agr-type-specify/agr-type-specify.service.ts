import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Utils} from '../../../helpers/utils';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class AgrTypeSpecifyService {

  constructor(private api: Api, private utils: Utils) { }

  addOrUpdate(body: any): any {
    return this.api.post(`${ApiPath.serviceAbsTemplate.agrTypeSpecify.addOrUpdate}`, body);
  }

  getListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeSpecify.getListPage, body);
  }

  getListAll(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrTypeSpecify.getListAll, body);
  }

  get(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsTemplate.agrTypeSpecify.get}/${id}`);
  }

  delete(...ids: any[]): any {
    const pars = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceAbsTemplate.agrTypeSpecify.delete}/${pars}`)
  }
}

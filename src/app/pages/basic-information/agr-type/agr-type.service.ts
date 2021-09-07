import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Utils} from '../../../helpers/utils';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class AgrTypeService {

  constructor(private api: Api, private utils: Utils) { }

  addOrUpdate(body: any): any {
    return this.api.post(`${ApiPath.serviceAbsTemplate.agrType.addOrUpdate}`, body);
  }

  getListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrType.getListPage, body);
  }

  getListAll(body: any): any {
    return this.api.post(ApiPath.serviceAbsTemplate.agrType.getListAll, body);
  }

  get(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsTemplate.agrType.get}/${id}`);
  }

  delete(...ids: any[]): any {
    const pars = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceAbsTemplate.agrType.delete}/${pars}`)
  }
}

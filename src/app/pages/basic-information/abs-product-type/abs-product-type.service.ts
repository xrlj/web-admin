import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ApiPath} from '../../../api-path';
import {Utils} from '../../../helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class AbsProductTypeService {

  constructor(private api: Api, private utils: Utils) { }

  addOrUpdate(body: any): any {
    return this.api.post(`${ApiPath.serviceAbsProduct.fpdtType.addOrUpdate}`, body);
  }

  getListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.fpdtType.getListPage, body);
  }

  get(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsProduct.fpdtType.get}/${id}`);
  }

  delete(...ids: any[]): any {
    const pars = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceAbsProduct.fpdtType.delete}/${pars}`)
  }
}

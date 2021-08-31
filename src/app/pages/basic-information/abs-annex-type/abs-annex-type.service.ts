import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Utils} from '../../../helpers/utils';
import {ApiPath} from '../../../api-path';

@Injectable({
  providedIn: 'root'
})
export class AbsAnnexTypeService {

  constructor(private api: Api, private utils: Utils) { }

  addOrUpdate(body: any): any {
    return this.api.post(`${ApiPath.serviceAbsProduct.annexType.addOrUpdate}`, body);
  }

  getListPage(body: any): any {
    return this.api.post(ApiPath.serviceAbsProduct.annexType.getListPage, body);
  }

  get(id: string): any {
    return this.api.get(`${ApiPath.serviceAbsProduct.annexType.get}/${id}`);
  }

  delete(...ids: any[]): any {
    const pars = this.utils.arrayToArrayParam(ids);
    return this.api.delete(`${ApiPath.serviceAbsProduct.annexType.delete}/${pars}`)
  }
}

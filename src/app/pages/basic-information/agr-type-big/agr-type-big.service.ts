import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';

@Injectable({
  providedIn: 'root'
})
export class AgrTypeBigService {

  constructor(private api: Api) { }
}

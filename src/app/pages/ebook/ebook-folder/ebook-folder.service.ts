import { Injectable } from '@angular/core';
import {Api} from '../../../helpers/http/api';

@Injectable({
  providedIn: 'root'
})
export class EbookFolderService {

  constructor(private api: Api) { }
}

import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {DictionaryTypeComponent} from './dictionary-type/dictionary-type.component';

@Component({
  selector: 'app-dictionary-manage',
  templateUrl: './dictionary-manage.component.html',
  styleUrls: ['./dictionary-manage.component.less']
})
export class DictionaryManageComponent implements OnInit {

  @ViewChild(DictionaryTypeComponent)
  dictionaryTypeComponent: DictionaryTypeComponent;

  dictSelectRecordInfo: any;

  showType = 1;

  constructor() { }

  ngOnInit() {
  }

  changeShowType(showType: number) {
    this.showType = showType;
  }

  goToDictType($event: any) {
    this.dictSelectRecordInfo = $event;
  }
}

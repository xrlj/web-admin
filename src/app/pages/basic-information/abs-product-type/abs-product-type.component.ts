import { Component, OnInit } from '@angular/core';

// ABS产品类别管理
@Component({
  selector: 'app-abs-product-type',
  templateUrl: './abs-product-type.component.html',
  styleUrls: ['./abs-product-type.component.less']
})
export class AbsProductTypeComponent implements OnInit {

  productTypeName: string;

  listOfAllData: any[] = []; // 列表数据
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  listOfDisplayData: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  search(b: boolean = false) {

  }

  addOrEdit(id: string) {
  }

  del(id: string) {
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: any[]): void {
    // this.listOfDisplayData = $event;
    // this.refreshStatus();
  }

  refreshStatus(): void {
   /* this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;*/
  }
}

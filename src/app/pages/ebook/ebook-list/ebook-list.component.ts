import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppPath} from '../../../app-path';
import {EbookListService} from './ebook-list.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styleUrls: ['./ebook-list.component.less']
})
export class EbookListComponent implements OnInit {

  bookName: string;
  author: string;

  // 列表
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  listOfDisplayData: any[] = [];
  listOfAllData: any[] = []; // 列表数据
  mapOfCheckedId: { [key: string]: boolean } = {}; // 记录选择
  numberOfChecked = 0;
  loading = false;
  pageIndex = 1;
  pageSize = 10;
  total = 0;

  constructor(private router: Router, private ebookListService: EbookListService,
              private uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
  }

  ngOnInit(): void {
    this.search(true);
  }

  search(reset: boolean = false) {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    const body = {pageIndex: this.pageIndex, pageSize: this.pageSize, bookName: this.bookName, author: this.author};
    this.ebookListService.getListPage(body)
      .ok(data => {
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
        this.listOfAllData = data.list;
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.loading = false;
      });
  }

  addOrEdit(id: string) {
    this.router.navigate([AppPath.ebook['ebook-add'], id]).then(r => {
    });
  }

  del(id?: string) {
    const checkIds: string[] = []; // 待删除角色
    if (id) {
      checkIds.push(id);
    } else {
      for (const key in this.mapOfCheckedId) {
        if (this.mapOfCheckedId[key]) {
          checkIds.push(key);
        }
      }
      if (checkIds.length === 0) {
        this.uiHelper.msgTipWarning('请选择待删除书籍!');
        return;
      }
    }
    this.uiHelper.modalDel('确定删除选择书籍信息？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.ebookListService.delete(checkIds)
          .ok(data => {
            if (data) {
              this.uiHelper.msgTipSuccess('删除成功');
              setTimeout(() => {
                this.search(true);
              }, 200);
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.defaultBusService.showLoading(false);
          });
      });
  }

  /**
   * 表格刷新选择信息。
   */
  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData.filter(item => !item.disabled).some(item => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  /**
   * 表格数据更改时候设定选择信息。保持选择或者取消
   * @param $event 选择事件
   */
  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * 选择所有。
   * @param value 选择事件
   */
  checkAll(value: boolean): void {
    this.listOfDisplayData.filter(item => !item.disabled).forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
}

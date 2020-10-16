import {Component, OnInit} from '@angular/core';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {VAreaDicResp} from '../../../helpers/vo/resp/v-area-dic-resp';
import {ZhAreaManageService} from './zh-area-manage.service';
import {UIHelper} from '../../../helpers/ui-helper';

@Component({
  selector: 'app-zh-area-manage',
  templateUrl: './zh-area-manage.component.html',
  styleUrls: ['./zh-area-manage.component.less']
})
export class ZhAreaManageComponent implements OnInit {

  isRefreshList = false;
  listOfMapData: VAreaDicResp[];
  mapOfExpandedData: { [key: string]: VAreaDicResp[] } = {};

  constructor(private zhAreaManageService: ZhAreaManageService,
              private uiHelper: UIHelper) {
  }

  ngOnInit() {
    this.isRefreshList = true;
    this.zhAreaManageService.getProvinceList()
      .ok(data => {
        this.listOfMapData = data;
        this.listOfMapData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.isRefreshList = false;
      });
  }

  /**
   * 新增
   */
  add() {
  }

  update(id: any) {
  }

  del(id: any, title: string | SVGTitleElement | HTMLTitleElement) {
  }

  /**
   * 收起的时候，把其下面所有的子节点也收起。
   * @param $event 展开true，收起false
   */
  collapse(array: VAreaDicResp[], data: VAreaDicResp, $event: boolean): void {
    debugger;
    if (!$event) { // 收起
      if (data.children) {
        data.children.forEach(d => {
          // tslint:disable-next-line:no-non-null-assertion
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    } else {  // 展开
      if (!data.children || data.children.length === 0) { // 没有子菜单，下面网络加载
        this.isRefreshList = true;
        this.zhAreaManageService.getChildrenList(data.id)
          .ok(children => {
            children.forEach(item => {
              item.expand = false;
              if (data.level === 3) {
                item.children = undefined;
              }
            });
            this.initExpand(this.listOfMapData);
            if (data.level === 0) {
              this.listOfMapData.find(a => a.id === data.id).expand = true;
              this.listOfMapData.find(a => a.id === data.id).children = children;
              this.listOfMapData.forEach(item => {
                this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
              });
            }
            if (data.level === 1) {
              const parent = this.listOfMapData.find(a => a.id === data.parentId);
              parent.expand = true;
              parent.children.find(a => a.id === data.id).children = children;
              parent.children.find(a => a.id === data.id).expand = true;
              this.listOfMapData.forEach(item => {
                this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
              });
            }
            if (data.level === 2) {
              const currentProvince = this.listOfMapData.find(a => a.id === data.parent.parentId);
              currentProvince.expand = true;
              const currentCity = currentProvince.children.find(city => city.id === data.parentId);
              currentCity.expand = true;
              const currentCounty = currentCity.children.find(county => county.id === data.id);
              currentCounty.expand = true;
              currentCounty.children = children;

              this.listOfMapData.forEach(item => {
                this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
              });
            }
            if (data.level === 3) {
              const currentProvince = this.listOfMapData.find(a => a.id === data.parent.parent.parentId);
              currentProvince.expand = true;
              const currentCity = currentProvince.children.find(city => city.id === data.parent.parentId);
              currentCity.expand = true;
              const currentCounty = currentCity.children.find(county => county.id === data.parentId);
              currentCounty.expand = true;
              const currentTown = currentCounty.children.find(town => town.id === data.id);
              currentTown.expand = true;
              currentTown.children = children;

              this.listOfMapData.forEach(item => {
                this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
              });
            }
          })
          .fail(error => {
            this.uiHelper.msgTipError(error.msg);
          })
          .final(b => {
            this.isRefreshList = false;
          });
      }
    }
  }

  /**
   * 递归收缩全部。
   */
  private initExpand(list: VAreaDicResp[]): void {
    list.forEach(item => {
      item.expand = false;
      if (item.children && item.children.length > 0) {
        this.initExpand(item.children);
      }
    });
  }

  convertTreeToList(root: VAreaDicResp): VAreaDicResp[] {
    const stack: VAreaDicResp[] = [];
    const array: VAreaDicResp[] = [];
    const hashMap = {};
    stack.push({...root, expand: root.expand ? true : false});

    while (stack.length !== 0) {
      // tslint:disable-next-line:no-non-null-assertion
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          // tslint:disable-next-line:no-non-null-assertion
          stack.push({...node.children[i], expand: node.children[i].expand ? true : false, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: VAreaDicResp, hashMap: { [key: string]: boolean }, array: VAreaDicResp[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  refresh() {
    this.ngOnInit();
  }
}

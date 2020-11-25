import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Constants} from '../../../helpers/constants';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.less']
})
export class AppAsideComponent implements OnInit {

  constructor() {}
  @Input() collapsed: boolean;
  @Output() toggleCollapsed = new EventEmitter();

  // menus = APP_MENUS;
  menus: VMenuResp[];

  // theme  = true;  // 主题
  theme  = environment.asideTheme === 'dark' ? true : false;  // 主题

  openMap: { [name: string]: boolean } = {};  // 类似hashMap

  ngOnInit() {
    this.menus = JSON.parse(localStorage.getItem(Constants.localStorageKey.menus));
    this.initOpenMap();
  }

  toggle() {
    this.toggleCollapsed.emit();
  }

  /**
   * 用key-value对象，记录每个菜单展开状态，收缩是false（默认），展开是true。
   */
  initOpenMap() {
    if (this.menus && this.menus.length > 0) {
      for (const i of this.menus) {
        this.openMap[i.title] = false;
      }
    }
  }

  /**
   * 菜单展开时回调该方法。然后修改其余一级菜单的展开状态。
   * @param value 一级菜单名称。
   */
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  /**
   * 更改菜单主题
   */
  changeAsideMenuTheme(theme: boolean) {
    this.theme  = theme;
  }
}

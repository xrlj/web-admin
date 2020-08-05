import {Component, OnInit} from '@angular/core';
import {ActivationStart, Event, NavigationEnd, Router} from '@angular/router';
import {Constants} from '../../../helpers/constants';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';

const expandMenu = menus => {
  const result = [];
  menus.forEach(menu1 => {
    if (menu1.children && menu1.children.length > 0) {
      menu1.children.forEach(menu2 => {
        if (menu2.children && menu2.children.length > 0) {
          menu2.children.forEach(menu3 => {
            if (menu3.children && menu3.children.length > 0) {
              menu3.children.forEach(menu4 => {
                result.push([menu1, menu2, menu3, menu4]);
              });
            } else {
              result.push([menu1, menu2, menu3]);
            }
          });
        } else {
          result.push([menu1, menu2]);
        }
      });
    } else {
      result.push([menu1]);
    }
  });
  return result;
};

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.less']
})
export class AppBodyComponent implements OnInit {

  menus: VMenuResp[];
  menusLastChildren: VMenuResp[] = []; // 所有最小级

  menuTabs = [];
  currentMenuTab = 0;

  constructor(private router: Router) {
    this.menus = JSON.parse(localStorage.getItem(Constants.localStorageKey.menus));
    console.log(this.menus);
    // 路由事件
    // detect router change
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.setCurrentMenuTab();
      }
    });
  }

  ngOnInit() {
    this.expandMenusLastChildrenAll(this.menus);
    console.log(JSON.stringify(this.menusLastChildren));
  }

  setCurrentMenuTab(): void {
    const currentUrl = this.router.url;
    const expandedMenus = expandMenu(this.menus);
    expandedMenus.forEach((menu, index) => {
      if (menu.length) {
        const lastMenu = menu[menu.length - 1];
        if (lastMenu.link === currentUrl) {
          this.newTab(lastMenu.title);
          // console.log(lastMenu.title + '====' + lastMenu.link);
        }
      }
    });
  }

  closeTab(tab: string): void {
    this.menuTabs.splice(this.menuTabs.indexOf(tab), 1);
    console.log('>>>aa' + this.menuTabs);
    console.log('>>>>bbb' + this.currentMenuTab);
  }

  newTab(tabName: string): void {
    if (this.menuTabs.length > 0) {
      const b = this.menuTabs.includes(tabName);
      if (!b) {
        this.menuTabs.push(tabName);
      }
    } else {
      this.menuTabs.push(tabName);
    }

    this.currentMenuTab = this.menuTabs.indexOf(tabName);
  }

  getIndexByMenuTabName(tabName: string): number {
    let i = 0
    this.menuTabs.forEach((title, index) => {
      if (tabName === title) {
        i = index;
      }
    })
    return i;
  }

  /**
   * 点击tab显示菜单对应的页面
   * @param tabName tab名称
   */
  showMenuLinkByTabName(): void {
    let tabName = '';
    this.menuTabs.every((value, index) => {
      if (index === this.currentMenuTab) {
        tabName = value;
        return false;
      }
      return true;
    })
    console.log(tabName);
    const link = this.getMenuLinkFromAllChildrenByTitle(tabName);;
    this.router.navigateByUrl(link);
  }

  getMenuLinkFromAllChildrenByTitle(title: string): string {
    let link = '';
    this.menusLastChildren.every(childMenu => {
      if (childMenu.title === title) {
        link = childMenu.link;
        return false;
      }
      return true;
    });
    return link;
  }

  /**
   * 遍历菜单树，把所有最小级菜单放到数组。
   * @param menus 菜单树
   */
  expandMenusLastChildrenAll(menus: VMenuResp[]): void {
    menus.forEach((menu, index) => {
      if (menu.children && menu.children.length > 0) {
        this.expandMenusLastChildrenAll(menu.children);
      } else {
        if (menu) {
          this.menusLastChildren.push(menu);
        }
      }
    });
  }
}

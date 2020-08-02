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
  currentBreads = [];

  menus: VMenuResp[];

  menuTabs = [];

  constructor(private router: Router) {
    this.menus = JSON.parse(localStorage.getItem(Constants.localStorageKey.menus));
    console.log(this.menus);
    // 路由事件
    // detect router change
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // this.setCurrentBreads();
        this.newTab('首页');
      }
    });
  }

  ngOnInit() {
  }

  setCurrentBreads() {
    const currentUrl = this.router.url;
    const expandedMenus = expandMenu(this.menus);

    let currentBreads = [];
    expandedMenus.forEach(menu => {
      if (menu.length) {
        const lastMenu = menu[menu.length - 1];
        if (lastMenu.link === currentUrl) {
          currentBreads = menu;
        }
      }
    });
    this.currentBreads = currentBreads;
  }

  closeTab(tab: string): void {
    this.menuTabs.splice(this.menuTabs.indexOf(tab), 1);
  }

  newTab(tabName: string): void {
    debugger;
    const  currentUrl = this.router.url;
    this.menuTabs.push(tabName);
  }
}

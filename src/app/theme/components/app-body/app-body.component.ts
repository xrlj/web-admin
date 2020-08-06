import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, mergeMap} from 'rxjs/operators';
import {SimpleReuseStrategy} from '../../layouts/simple-reuse-strategy';

@Component({
  selector: 'app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.less']
})
export class AppBodyComponent implements OnInit {

  menuList = [];
  currentMenuTab = -1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((event) => {
      // 路由data的标题
      const menu = {...event};
      menu.url = this.router.url;
      const url = menu.url;
      this.titleService.setTitle(menu.title); // 设置网页标题
      const exitMenu = this.menuList.find(info => info.url === url);
      if (!exitMenu) {// 如果不存在那么不添加，
        this.menuList.push(menu);
      }
      this.currentMenuTab = this.menuList.findIndex(p => p.url === url);
    });
  }

  ngOnInit() {
  }

  // 关闭选项标签
  closeUrl(url: string) {
    // 当前关闭的是第几个路由
    const index = this.menuList.findIndex(p => p.url === url);
    // 如果只有一个不可以关闭
    if (this.menuList.length === 1) {
      return;
    }
    this.menuList.splice(index, 1);
    // 删除复用
    // delete SimpleReuseStrategy.handlers[module];
    SimpleReuseStrategy.deleteRouteSnapshot(url);
    // 如果当前删除的对象是当前选中的，那么需要跳转
    if (this.currentMenuTab === index) {
      // 显示上一个选中
      let menu = this.menuList[index - 1];
      if (!menu) {// 如果上一个没有下一个选中
        menu = this.menuList[index];
      }
      // 跳转路由
      this.router.navigate([menu.url]);    }
  }

  /**
   * tab发生改变
   */
  nzSelectChange($event) {
    this.currentMenuTab = $event.index;
    const menu = this.menuList[this.currentMenuTab];
    // 跳转路由
    this.router.navigate([menu.url]);
  }
}


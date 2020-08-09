import {Component, OnInit} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {ApiPath} from '../../../api-path';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {ThemeEnum} from '../../../helpers/enum/theme-enum';
import {environment} from '../../../../environments/environment';
import {SimpleReuseStrategy} from '../../../helpers/simple-reuse-strategy';
import {Constants} from '../../../helpers/constants';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  constructor(private router: Router,
              private api: Api,
              public utils: Utils,
              public uiHelper: UIHelper, private defaultBusService: DefaultBusService) {
    this.uiHelper.storageCurrentTheme(environment.themeStyle);
  }

  appName = '总后台';

  jwtKvEnum: typeof  JwtKvEnum = JwtKvEnum;
  themeEnum: typeof  ThemeEnum = ThemeEnum;

  menusLastChildren: VMenuResp[] = []; // 所有最小级

  ngOnInit() {
    // const menus = JSON.parse(localStorage.getItem(Constants.localStorageKey.menus));
    // this.expandMenusLastChildrenAll(menus);
  }

  /**
   * 退出登录。
   */
  logout(): void {
    this.uiHelper.modalConfirm('确定退出登录？')
      .ok(() => {
        this.defaultBusService.showLoading(true);
        this.api.get(ApiPath.logout).ok(data => {
          if (data) {
            localStorage.clear();
            this.router.navigateByUrl(AppPath.login); // 退出成功
          } else {
            this.uiHelper.msgTipError('退出失败');
          }
        }).fail(error => {
          this.uiHelper.msgTipError('退出失败');
        }).final(() => {
          this.defaultBusService.showLoading(false);
        });
      });
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

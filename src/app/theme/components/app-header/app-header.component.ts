import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Api} from '../../../helpers/http/api';
import {Router} from '@angular/router';
import {ApiPath} from '../../../api-path';
import {UIHelper} from '../../../helpers/ui-helper';
import {AppPath} from '../../../app-path';
import {DefaultBusService} from '../../../helpers/event-bus/default-bus.service';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';
import {ThemeEnum} from '../../../helpers/enum/theme-enum';
import {environment} from '../../../../environments/environment';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {Constants} from '../../../helpers/constants';

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
  }

  isFullScreen = false; // 是否全屏显示，true全屏，false退出全屏

  @Input() collapsed: boolean;

  @Output() currentTheme = new EventEmitter();  // 更改主题色调，弹射主题到父组件
  @Output() asideTheme = new EventEmitter();  // 更改菜单抽屉主题，弹射主题到父组件

  appName = Constants.appInfo.appName;

  jwtKvEnum: typeof  JwtKvEnum = JwtKvEnum;
  themeEnum: typeof  ThemeEnum = ThemeEnum;

  // menusLastChildren: VMenuResp[] = []; // 所有最小级

  // ====== 系统设置-抽屉
  settingVisible: boolean;
  sliderMenuThemeChecked = true;
  themeRadioValue: string;

  ngOnInit() {
    this.themeRadioValue = this.uiHelper.getCurrentTheme();

    window.addEventListener('resize', () => {
      this.checkFull();
    });
  }

  /**
   * 变更菜单抽屉主题,并弹出到父组件。
   * @param event 选定true，否者false
   */
  asideChangeTheme(event): void {
    this.asideTheme.emit(event);
  }

  /**
   * 更改系统主题色调。
   * @param event 主题
   */
  changeTheme(event: any): void {
    let theme = null;
    switch (event) {
      case ThemeEnum.Default:
        theme = ThemeEnum.Default;
        break;
      case ThemeEnum.Orange:
        theme = ThemeEnum.Orange;
        break;
      case ThemeEnum.Turquoise:
        theme = ThemeEnum.Turquoise;
        break;
    }
    this.uiHelper.changeTheme(theme);
    this.currentTheme.emit(theme);
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
            this.uiHelper.logoutLocalStorageClean();
            this.router.navigate([AppPath.login]); // 退出成功
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
  /*expandMenusLastChildrenAll(menus: VMenuResp[]): void {
    menus.forEach((menu, index) => {
      if (menu.children && menu.children.length > 0) {
        this.expandMenusLastChildrenAll(menu.children);
      } else {
        if (menu) {
          this.menusLastChildren.push(menu);
        }
      }
    });
  }*/

  openSettingDrawer() {
    this.settingVisible = true;
  }

  closeSettingDrawer() {
    this.settingVisible = false;
  }

  /**
   * 个人中心。
   */
  openUserCentre() {
    this.router.navigate(['/pages/user-centre']);
  }

  /**
   * 设置全屏显示。
   */
  fullScreen() {
    if (!this.isFullScreen) {
      const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
        mozRequestFullScreen(): Promise<void>;
        webkitRequestFullscreen(): Promise<void>;
        msRequestFullscreen(): Promise<void>;
      };

      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      this.isFullScreen = true;
    } else {
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
      this.isFullScreen = false;
    }
  }

  /**
   * 监听全屏显示。
   */
  checkFull() {
    const fullStatus = document['fullscreen'] || document['webkitIsFullScreen'] || document['mozFullScreen'] || false;
    if (!fullStatus) {
      this.isFullScreen = false;
    } else {
      this.isFullScreen = true;
    }
  }

  showMyNotify() {
    this.router.navigate([AppPath['announcement-my']])
  }
}

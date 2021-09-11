// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// 开发环境
import {ThemeEnum} from '../app/helpers/enum/theme-enum';

export const environment = {
  production: false,
  tag: 'dev',
  themeStyle: ThemeEnum.Orange, // 设置系统默认风格
  asideTheme: 'light',  // 菜单抽屉主题，dark or light
  // apiUrl: 'http://api-dev.xrlj.com:5555'
  apiUrl: 'http://192.168.0.3:5555'
  // apiUrl: 'http://47.112.121.246:4369'
  // apiUrl: 'http://127.0.0.1:5555'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

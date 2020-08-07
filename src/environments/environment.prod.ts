import {ThemeEnum} from '../app/helpers/enum/theme-enum';

export const environment = {
  production: true,
  tag: 'prod',
  themeStyle: ThemeEnum.Orange,
  config_global: true, // 是否启用全局变量。全局变量在app.config.ts中配置。
  // apiUrl: 'http://api-dev.xrlj.com:5555'
  apiUrl: 'http://baaa8047.ngrok.io'
};

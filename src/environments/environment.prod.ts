import {ThemeEnum} from '../app/helpers/enum/theme-enum';

export const environment = {
  production: true,
  tag: 'prod',
  themeStyle: ThemeEnum.Orange,
  asideTheme: 'light',  // 菜单抽屉主题，dark or light
  // apiUrl: 'http://api-dev.xrlj.com:5555'
  apiUrl: 'http://3bda9085c06c.ngrok.io'
};

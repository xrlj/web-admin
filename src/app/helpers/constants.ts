export const Constants = {
  apiRequest: {
    retryTime: 3,  // 重试次数
    timeOut: 5000
  },
  appInfo: {
    // appName: '链金总后台',
    appName: '链金科技总后台',
    clientId: '0a9cbbbb4f130988',
    clientDeviceType: 'web'
  },
  localStorageKey: {
    token: 'm-jwt-token',
    menus: 'user-menus', // 菜单
    currentTheme: 'current-theme' // 当前主题色调风格
  },
  nzFormItem: {
    nzFormLabel: {
      nzSm: 4,
      nzXs: 24
    },
    nzFormControl: {
      nzSm: 10,
      nzXs: 24
    }
  },
  fileUpload: {
    ebookUploadSize: 200 // 电子书上传不超过200M
  }
};

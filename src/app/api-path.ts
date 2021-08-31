const serviceauth = 'serviceauth'; // 服务名称
const usercentral = 'usercentral';
const sysfilesystem = 'sysfilesystem'; // 文件系统服务
const syscommon = 'syscommon';
const serviceebook = 'serviceebook';
const serviceAbsProduct = 'serviceAbsProduct';

export const ApiPath = {
  login: `/${serviceauth}/auth/sysLogin`,
  logout: `/${serviceauth}/auth/invalidate`,
  usercentral: {
    userApi: {
      getUserMenus: `/${usercentral}/user/getUserMenus`,
      addSystemUser: `/${usercentral}/user/addSystemUser`,
      updateSystemUser: `/${usercentral}/user/updateSystemUser`,
      getUserCanSelectRoles: `/${usercentral}/user/getUserCanSelectRoles`,
      getRolesByUserId: `/${usercentral}/user/getRolesByUserId`,
      addUserRoles: `/${usercentral}/user/addUserRoles`,
      getUserList: `/${usercentral}/user/getUserList`,
      exitUsername: `/${usercentral}/user/exitUsername`,
      updateUserStatus: `/${usercentral}/user/updateUserStatus`,
      delUser: `/${usercentral}/user/delUser`,
      getUserInfoById: `/${usercentral}/user/getUserInfoById`,
      updateUserPassword: `/${usercentral}/user/updateUserPassword`,
      resetUserPassword: `/${usercentral}/user/resetUserPassword`,
      getEtpUserList: `/${usercentral}/user/getEtpUserList`,
      saveCheckUserSeal: `/${usercentral}/user/saveCheckUserSeal`
    },
    enterpriseApi: {
      addByAdminSystemInvitation: `/${usercentral}/enterprise/addByAdminSystemInvitation`,
      getAll: `/${usercentral}/enterprise/getAll`,
      getEtpInfo: `/${usercentral}/enterprise/getEtpInfo`,
      checkEtpInfo: `/${usercentral}/enterprise/checkEtpInfo`,
      getEtpInfoByUser: `/${usercentral}/enterprise/getEtpInfoByUser`
    },
    menuApi: {
      saveOrUpdate: `/${usercentral}/menu/saveOrUpdate`,
      getMenuList: `/${usercentral}/menu/getMenuList`,
      delById: `/${usercentral}/menu/delById`,
      getById: `/${usercentral}/menu/getById`
    },
    appInfoApi: {
      getAll: `/${usercentral}/appInfo/getAll`,
      getAllPage: `/${usercentral}/appInfo/getAllPage`,
      registerAppInfo: `/${usercentral}/appInfo/registerAppInfo`,
      update: `/${usercentral}/appInfo/update`,
      delAppInfo: `/${usercentral}/appInfo/delAppInfo`,
      getAppInfoByAppId: `/${usercentral}/appInfo/getAppInfoByAppId`
    },
    roleApi: {
      getAll: `/${usercentral}/role/getAll`,
      save: `/${usercentral}/role/save`,
      update: `/${usercentral}/role/update`,
      getById: `/${usercentral}/role/getById`,
      del: `/${usercentral}/role/del`,
      getAllRoleByDeptId: `/${usercentral}/role/getAllRoleByDeptId`
    },
    dept: {
      saveOrUpdate: `/${usercentral}/dept/saveOrUpdate`,
      del: `/${usercentral}/dept/del`,
      getById: `/${usercentral}/dept/getById`,
      getAll: `/${usercentral}/dept/getAll`
    },
    rolePermissions: {
      addPermission: `/${usercentral}/rolePermissions/addPermission`,
      updatePermission: `/${usercentral}/rolePermissions/updatePermission`,
      getPermissionById: `/${usercentral}/rolePermissions/getPermissionById`,
      getPermissionListPage: `/${usercentral}/rolePermissions/getPermissionListPage`,
      delPermission: `/${usercentral}/rolePermissions/delPermission`
    }
  },
  sysfilesystem: {
    sysFiles: {
      uploadFile: `/${sysfilesystem}/sysFiles/uploadFile`
    }
  },
  syscommon: {
    areaDic: {
      getProvinceList: `/${syscommon}/areaDic/getProvinceList`,
      getChildrenList: `/${syscommon}/areaDic/getChildrenList`,
    },
    universalDic: {
      addOrUpdate: `/${syscommon}/universalDic/addOrUpdate`,
      delete: `/${syscommon}/universalDic/delete`,
      get: `/${syscommon}/universalDic/get`,
      getListPage: `/${syscommon}/universalDic/getListPage`,
      getList: `/${syscommon}/universalDic/getList`
    },
    universalDicValue: {
      addOrUpdate: `/${syscommon}/universalDicValue/addOrUpdate`,
      delete: `/${syscommon}/universalDicValue/delete`,
      get: `/${syscommon}/universalDicValue/get`,
      getListPage: `/${syscommon}/universalDicValue/getListPage`,
      getList: `/${syscommon}/universalDicValue/getList`
    }
  },
  serviceAbsProduct: {
    fpdtType: {
      addOrUpdate: `/${serviceAbsProduct}/fpdtType/addOrUpdate`,
      delete: `/${serviceAbsProduct}/fpdtType/delete`,
      get: `/${serviceAbsProduct}/fpdtType/get`,
      getListPage: `/${serviceAbsProduct}/fpdtType/getListPage`,
      getList: `/${serviceAbsProduct}/fpdtType/getList`
    }
  },
  serviceebook: {
    bookInfo: {
      save: `/${serviceebook}/bookInfo/save`,
      update: `/${serviceebook}/bookInfo/update`,
      get: `/${serviceebook}/bookInfo/get`,
      delete: `/${serviceebook}/bookInfo/delete`,
      getListPage: `/${serviceebook}/bookInfo/getListPage`
    },
    bookMenu: {
      save: `/${serviceebook}/bookMenu/save`,
      update: `/${serviceebook}/bookMenu/update`,
      delete: `/${serviceebook}/bookMenu/delete`,
      get: `/${serviceebook}/bookMenu/get`,
      getListPage: `/${serviceebook}/bookMenu/getListPage`,
      getListTree: `/${serviceebook}/bookMenu/getListTree`
    }
  }

};

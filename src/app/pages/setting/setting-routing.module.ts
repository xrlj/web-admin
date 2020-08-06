import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from './user-manage/user-manage.component';
import {DepartmentManageComponent} from './department-manage/department-manage.component';
import {AppManageComponent} from './app-manage/app-manage.component';
import {MenuManageComponent} from './menu-manage/menu-manage.component';
import {RoleManageComponent} from './role-manage/role-manage.component';
import {PermissionManageComponent} from './permission-manage/permission-manage.component';
import {ParameterManageComponent} from './parameter-manage/parameter-manage.component';
import {DictionaryTypeComponent} from './dictionary-manage/dictionary-type/dictionary-type.component';
import {FileManageComponent} from './file-manage/file-manage.component';
import {ZhAreaManageComponent} from './zh-area-manage/zh-area-manage.component';
import {DictionaryManageComponent} from './dictionary-manage/dictionary-manage.component';
import {EtpManageComponent} from '../customer/etp-manage/etp-manage.component';

const routes: Routes = [
  { path: 'user', component: UserManageComponent, data: {title: '用户管理', isRemove: true} },
  { path: 'department', component: DepartmentManageComponent, data: {title: '部门管理', isRemove: true} },
  { path: 'app', component: AppManageComponent, data: {title: '应用管理', isRemove: true} },
  { path: 'menu', component: MenuManageComponent, data: {title: '菜单管理', isRemove: true} },
  { path: 'role', component: RoleManageComponent, data: {title: '角色管理', isRemove: true} },
  { path: 'permission', component: PermissionManageComponent, data: {title: '权限管理', isRemove: true} },
  { path: 'parameter', component: ParameterManageComponent, data: {title: '参数管理', isRemove: true} },
  { path: 'dictionary', component: DictionaryManageComponent, data: {title: '字段管理', isRemove: true} },
  { path: 'dictionary-type', component: DictionaryTypeComponent, data: {title: '字典类型管理', isRemove: true} },
  { path: 'file', component: FileManageComponent, data: {title: '文件管理', isRemove: true} },
  { path: 'zh-area', component: ZhAreaManageComponent, data: {title: '地区管理', isRemove: true} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}

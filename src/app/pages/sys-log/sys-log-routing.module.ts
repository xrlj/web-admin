import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SysLogLoginComponent} from './sys-log-login/sys-log-login.component';
import {SysLogOperationComponent} from './sys-log-operation/sys-log-operation.component';
import {SysLogErrorComponent} from './sys-log-error/sys-log-error.component';
import {ParameterManageComponent} from '../setting/parameter-manage/parameter-manage.component';


const routes: Routes = [
  { path: 'login', component: SysLogLoginComponent, data: {title: '登录日志', isRemove: true} },
  { path: 'operation', component: SysLogOperationComponent, data: {title: '操作日志', isRemove: true} },
  { path: 'error', component: SysLogErrorComponent, data: {title: '异常日志', isRemove: true} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysLogRoutingModule { }

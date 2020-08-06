import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EtpManageComponent} from './etp-manage/etp-manage.component';
import {EtpAccountComponent} from './etp-account/etp-account.component';

const routes: Routes = [
  { path: 'etp', component: EtpManageComponent, data: {title: '企业管理', isRemove: true} },
  { path: 'account', component: EtpAccountComponent, data: {title: '企业账号管理', isRemove: true} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

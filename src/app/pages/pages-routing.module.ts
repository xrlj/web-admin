import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BlankComponent, DefaultComponent} from '../theme/layouts';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {InitComponent} from './init/init.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'init', component: InitComponent }
    ]
  },
  {
    path: 'pages',
    component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent, data: {title: '首页', isRemove: false} },
      {
        path: 'customer',
        loadChildren: () =>import('./customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'setting',
        loadChildren: () =>import('./setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'announcement',
        loadChildren: () =>import('./announcement/announcement.module').then(m => m.AnnouncementModule)
      },
      {
        path: 'notify',
        loadChildren: () =>import('./notify/notify.module').then(m => m.NotifyModule)
      },
      {
        path: 'sys-log',
        loadChildren: () =>import('./sys-log/sys-log.module').then(m => m.SysLogModule)
      },
      {
        path: 'user-centre',
        loadChildren: () =>import('./user-centre/user-centre.module').then(m => m.UserCentreModule)
      },
      {
        path: 'ebook',
        loadChildren: () => import('./ebook/ebook.module').then(m => m.EbookModule)
      },
      {
        path: 'basic-info',
        loadChildren: () => import('./basic-information/basic-information.module').then(m => m.BasicInformationModule)
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

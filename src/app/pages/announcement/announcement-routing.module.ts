import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnnouncementMyComponent} from './announcement-my/announcement-my.component';
import {AnnouncementManageComponent} from './announcement-manage/announcement-manage.component';

const routes: Routes = [
  {path: 'my', component: AnnouncementMyComponent, data: {title: '我的通知', isRemove: true}},
  {path: 'manage', component: AnnouncementManageComponent, data: {title: '通知管理', isRemove: true}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {
}

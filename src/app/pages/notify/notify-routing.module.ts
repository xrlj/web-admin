import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotifySmsManageComponent} from './notify-sms-manage/notify-sms-manage.component';
import {NotifySmsRecordComponent} from './notify-sms-record/notify-sms-record.component';
import {NotifyEmailManageComponent} from './notify-email-manage/notify-email-manage.component';
import {NotifyEmailRecordComponent} from './notify-email-record/notify-email-record.component';


const routes: Routes = [
  {path: 'sms', component: NotifySmsManageComponent, data: {title: '短信服务', isRemove: true}},
  {path: 'sms-record', component: NotifySmsRecordComponent, data: {title: '短信发送记录', isRemove: true}},
  {path: 'email', component: NotifyEmailManageComponent, data: {title: '邮件服务', isRemove: true}},
  {path: 'email-record', component: NotifyEmailRecordComponent, data: {title: '邮件发送记录', isRemove: true}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifyRoutingModule { }

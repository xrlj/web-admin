import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtpManageComponent } from './etp-manage/etp-manage.component';
import { EtpAccountComponent } from './etp-account/etp-account.component';
import {CustomerRoutingModule} from './customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EtpAccountMenuComponent } from './etp-account/etp-account-menu/etp-account-menu.component';
import { EtpAccountDetailsComponent } from './etp-account/etp-account-details/etp-account-details.component';



@NgModule({
  declarations: [EtpManageComponent, EtpAccountComponent, EtpAccountMenuComponent, EtpAccountDetailsComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule
  ]
})
export class CustomerModule { }

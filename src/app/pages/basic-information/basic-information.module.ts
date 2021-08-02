import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BasicInformationRoutingModule} from './basic-information-routing.module';
import {AbsProductTypeComponent} from './abs-product-type/abs-product-type.component';
import {EtpRoleTypeComponent} from './etp-role-type/etp-role-type.component';
import {AbsAnnexTypeComponent} from './abs-annex-type/abs-annex-type.component';
import {ProtocolTemplateParComponent} from './protocol-template-par/protocol-template-par.component';
import {NzCardModule, NzDividerModule, NzIconModule, NzInputModule, NzModalModule, NzTableModule, NzTagModule} from 'ng-zorro-antd';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule} from '@angular/forms';

// 基础资料管理模块
@NgModule({
  declarations: [AbsProductTypeComponent, EtpRoleTypeComponent, AbsAnnexTypeComponent, ProtocolTemplateParComponent],
  imports: [
    CommonModule,
    BasicInformationRoutingModule,
    NzCardModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule
  ]
})
export class BasicInformationModule { }

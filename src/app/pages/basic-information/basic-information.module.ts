import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BasicInformationRoutingModule} from './basic-information-routing.module';
import {AbsProductTypeComponent} from './abs-product-type/abs-product-type.component';
import {AbsAnnexTypeComponent} from './abs-annex-type/abs-annex-type.component';
import {ProtocolTemplateParComponent} from './protocol-template-par/protocol-template-par.component';
import {NgZorroAntdModule, NzBadgeModule, NzCardModule, NzDividerModule, NzDropDownModule, NzFormModule, NzInputNumberModule, NzModalModule, NzSelectModule, NzTableModule, NzTagModule, NzTreeSelectModule} from 'ng-zorro-antd';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgrTypeBigComponent} from './agr-type-big/agr-type-big.component';
import {AgrTypeComponent} from './agr-type/agr-type.component';
import {AgrTypeSpecifyComponent} from './agr-type-specify/agr-type-specify.component';

// 基础资料管理模块
@NgModule({
  declarations: [AbsProductTypeComponent, AbsAnnexTypeComponent, ProtocolTemplateParComponent, AgrTypeBigComponent, AgrTypeComponent, AgrTypeSpecifyComponent],
  imports: [
    CommonModule,
    BasicInformationRoutingModule,
    NzCardModule,
    FormsModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzTreeSelectModule,
    NzSelectModule,
    NzBadgeModule,
    NzDropDownModule,
    NgZorroAntdModule
  ]
})
export class BasicInformationModule { }

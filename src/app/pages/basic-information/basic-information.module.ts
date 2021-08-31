import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BasicInformationRoutingModule} from './basic-information-routing.module';
import {AbsProductTypeComponent} from './abs-product-type/abs-product-type.component';
import {AbsAnnexTypeComponent} from './abs-annex-type/abs-annex-type.component';
import {ProtocolTemplateParComponent} from './protocol-template-par/protocol-template-par.component';
import {NzBadgeModule, NzCardModule, NzDividerModule, NzDropDownModule, NzFormModule, NzIconModule, NzInputModule, NzInputNumberModule, NzModalModule, NzSelectModule, NzTableModule, NzTagModule, NzTreeSelectModule} from 'ng-zorro-antd';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// 基础资料管理模块
@NgModule({
  declarations: [AbsProductTypeComponent, AbsAnnexTypeComponent, ProtocolTemplateParComponent],
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
    NzDividerModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputNumberModule,
    NzTreeSelectModule,
    NzSelectModule,
    NzBadgeModule,
    NzDropDownModule
  ]
})
export class BasicInformationModule { }

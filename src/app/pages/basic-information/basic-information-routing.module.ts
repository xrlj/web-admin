import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AbsAnnexTypeComponent} from './abs-annex-type/abs-annex-type.component';
import {AbsProductTypeComponent} from './abs-product-type/abs-product-type.component';
import {ProtocolTemplateParComponent} from './protocol-template-par/protocol-template-par.component';


const routes: Routes = [
  {
    path: 'abs-annex-type',
    component: AbsAnnexTypeComponent,
    data: {
      title: '附件类型管理',
      isRemove: true
    }
  },
  {
    path: 'abs-product-type',
    component: AbsProductTypeComponent,
    data: {
      title: '产品类别管理',
      isRemove: true
    }
  },
  {
    path: 'protocol-template-par',
    component: ProtocolTemplateParComponent,
    data: {
      title: '协议模板参数管理',
      isRemove: true
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicInformationRoutingModule {
}

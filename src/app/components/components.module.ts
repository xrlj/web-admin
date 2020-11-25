import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomBtnComponent} from './custom-btn/custom-btn.component';
import {CustomLoadingComponent} from './custom-loading/custom-loading.component';
import {NzSpinModule} from 'ng-zorro-antd';

/**
 * 自定义组件模块。适用于全系统。
 */
@NgModule({
  declarations: [CustomBtnComponent, CustomLoadingComponent],
  imports: [
    CommonModule,
    NzSpinModule
  ],
  exports: [
    CustomBtnComponent,
    CustomLoadingComponent
  ]
})
export class ComponentsModule { }

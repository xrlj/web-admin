import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgZorroAntdModule, NzDrawerModule} from 'ng-zorro-antd';
import { ThemeRoutingModule } from './theme-routing.module';
import {
  AppHeaderComponent,
  AppBodyComponent,
  AppAsideComponent,
  AppFooterComponent
} from './components';
import { DefaultComponent, BlankComponent } from './layouts';
import {FormsModule} from '@angular/forms';

const COMPONENTS = [
  DefaultComponent,
  AppHeaderComponent,
  AppBodyComponent,
  AppAsideComponent,
  AppFooterComponent,
  BlankComponent
];

@NgModule({
  declarations: [...COMPONENTS],
    imports: [CommonModule, NgZorroAntdModule, ThemeRoutingModule, NzDrawerModule, FormsModule]
})
export class ThemeModule {}

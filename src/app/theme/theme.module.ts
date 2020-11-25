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
import {ComponentsModule} from '../components/components.module';

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
    imports: [CommonModule, NgZorroAntdModule, ThemeRoutingModule, NzDrawerModule, FormsModule, ComponentsModule]
})
export class ThemeModule {}

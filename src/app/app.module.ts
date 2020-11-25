import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {httpInterceptorProviders} from './interceptors';
import { UEditorModule } from 'ngx-ueditor';
import {IconsProviderModule} from './icons-provider.module';
import {RouteReuseStrategy} from '@angular/router';
import {SimpleReuseStrategy} from './helpers/simple-reuse-strategy';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.config.js`,
        `./assets/ueditor/ueditor.all.min.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/'
      }
    })
  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    httpInterceptorProviders,
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

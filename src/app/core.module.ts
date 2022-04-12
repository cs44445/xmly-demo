import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { BreadcrumbModule } from './common/components/breadcrumb/breadcrumb.module';




@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BreadcrumbModule,
    // DirectivesModule
  ],
  exports: [//需要导出才能在app.module中正常使用
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BreadcrumbModule
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule只能被AppModule引入!!!')
    }
  }
}

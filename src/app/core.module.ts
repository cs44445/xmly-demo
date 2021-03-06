import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './layouts/header/header.component';
import { BreadcrumbModule } from './common/components/breadcrumb/breadcrumb.module';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';




@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BreadcrumbModule,
    HttpClientModule,
    PagesModule,
    BrowserAnimationsModule
  ],
  exports: [//需要导出才能在app.module中正常使用
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    BreadcrumbModule,
    PagesModule
  ]
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule只能被AppModule引入!!!')
    }
  }
}

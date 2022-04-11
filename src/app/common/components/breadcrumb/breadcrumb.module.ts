import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from '../breadcrumb-item/breadcrumb-item.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    BreadcrumbItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BreadcrumbComponent,//需要导出，才能正常使用
    BreadcrumbItemComponent
  ]
})
export class BreadcrumbModule { }

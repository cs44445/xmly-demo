import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemComponent } from '../breadcrumb-item/breadcrumb-item.component';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    BreadcrumbItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    BreadcrumbComponent,//需要导出，才能正常使用
    BreadcrumbItemComponent
  ]
})
export class BreadcrumbModule { }

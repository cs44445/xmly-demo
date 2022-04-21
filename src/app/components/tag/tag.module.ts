import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag.component';
import { DirectivesModule } from 'src/app/common/directives/directives.module';

@NgModule({
  declarations: [
    TagComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,//需要引入，否则app-icon指令不能正常使用
  ],
  exports: [
    TagComponent
  ]
})
export class TagModule { }

import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './number-format.pipe';

@NgModule({
  declarations: [
    NumberFormatPipe
  ],
  exports: [
    NumberFormatPipe//需要导出，否则无法使用，会报错
  ]
})
export class PipesModule { }

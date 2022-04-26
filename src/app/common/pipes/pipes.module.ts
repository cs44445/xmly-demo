import { NgModule } from '@angular/core';
import { NumberFormatPipe } from './number-format.pipe';
// import { SafeContentPipe } from './safe-content.pipe';

@NgModule({
  declarations: [
    NumberFormatPipe,
    // SafeContentPipe
  ],
  exports: [
    NumberFormatPipe,//需要导出，否则无法使用，会报错
    // SafeContentPipe
  ]
})
export class PipesModule { }

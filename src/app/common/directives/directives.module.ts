import { NgModule } from '@angular/core';
import { StrTpOutletDirective } from './str-tp-outlet.directive';
import { IconDirective } from './icon.directive';
import { BtnDirective } from './btn.directive';
import { TaggleMoreDirective } from './taggle-more.directive';
@NgModule({
  declarations: [
    StrTpOutletDirective,
    IconDirective,
    BtnDirective,
    TaggleMoreDirective
  ],
  exports: [
    StrTpOutletDirective,
    IconDirective,
    TaggleMoreDirective
  ]
})
export class DirectivesModule { }

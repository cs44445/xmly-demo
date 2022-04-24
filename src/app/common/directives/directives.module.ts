import { NgModule } from '@angular/core';
import { StrTpOutletDirective } from './str-tp-outlet.directive';
import { IconDirective } from './icon.directive';
import { BtnDirective } from './btn.directive';
@NgModule({
  declarations: [
    StrTpOutletDirective,
    IconDirective,
    BtnDirective
  ],
  exports: [
    StrTpOutletDirective,
    IconDirective
  ]
})
export class DirectivesModule { }

import { NgModule } from '@angular/core';
import { StrTpOutletDirective } from './str-tp-outlet.directive';
import { IconDirective } from './icon.directive';
@NgModule({
  declarations: [
    StrTpOutletDirective,
    IconDirective
  ],
  exports: [
    StrTpOutletDirective,
    IconDirective
  ]
})
export class DirectivesModule { }

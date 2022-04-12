import { NgModule } from '@angular/core';
import { StrTpOutletDirective } from './str-tp-outlet.directive';


@NgModule({
  declarations: [
    StrTpOutletDirective
  ],
  exports: [
    StrTpOutletDirective
  ]
})
export class DirectivesModule { }

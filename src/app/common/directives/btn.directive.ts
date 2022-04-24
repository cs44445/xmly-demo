import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'a[appBtn],button[appBtn]',
  host: {
    '[class.xm-btn]': 'true'
  }
})
export class BtnDirective {
  @Input() @HostBinding('class.xm-btn-block') xmBlock = false;
  @Input() @HostBinding('class.xm-btn-circle') xmCircle = false;
  constructor() { }
}




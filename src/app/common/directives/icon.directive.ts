import { Directive, ElementRef, Host, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { IconType } from './type';

@Directive({
  selector: '[appIcon]',
  host: {// 给元素绑定一个class 方法2
    '[class.iconfont]': 'true'//注意：这里的布尔值必须加引号
  }
})
export class IconDirective implements OnChanges {
  // 给元素绑定一个class 方法1
  // @HostBinding('class.iconfont') readonly hostCls = true
  @Input('appIcon') type: IconType = 'headset'
  constructor(
    private el: ElementRef,
    private rd2: Renderer2
  ) {
    // console.log('icon');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.type, '=====');
    const { type } = changes
    // console.log(changes, 'changes');
    // 点击测试icon指令
    if (type.previousValue) {
      this.rd2.removeClass(this.el.nativeElement, 'icon-' + type.previousValue)
    }
    this.rd2.addClass(this.el.nativeElement, 'icon-' + type.currentValue)
  }
}

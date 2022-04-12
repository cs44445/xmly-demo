import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStrTpOutlet]'
})
export class StrTpOutletDirective implements OnChanges {
  @Input() appStrTpOutlet?: TemplateRef<any> | string;
  // 添加上下文
  @Input() appStrTpOutletContext: any;//注意：appStrTpOutletContext前半部分的拼写必须和上面的appStrTpOutlet保持一致，否则不能使用

  // 输入型指令 需要注入ViewContainerRef templateRef
  constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<any>) { }

  ngOnChanges(changes: SimpleChanges): void {//监听这个输入型属性
    const { appStrTpOutlet } = changes
    if (appStrTpOutlet) {//如果视图有变化
      this.viewContainer.clear()//先清除之前的视图再重新创建 
      // 判断是传入的是模板还是字符串
      const template = (this.appStrTpOutlet instanceof TemplateRef) ? this.appStrTpOutlet : this.templateRef
      // this.viewContainer.createEmbeddedView(template)
      // 添加上下文
      this.viewContainer.createEmbeddedView(template,this.appStrTpOutletContext)
    }
  }
}

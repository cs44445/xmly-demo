import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef, Optional } from '@angular/core';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbItemComponent implements OnInit {
  // 方法1 直接给子组件传值(缺点：需要给每个子组件都传入模板)
  // @Input() separatorContent = '>';
  // @Input() separatorContent?: TemplateRef<any>
  myContext = { $implicit: 'World', my: 'svet' };
  // 方法2 直接将父组件注入进来，这样就能在子组件拿到父组件，只需要给父组件传模板，然后直接读取父组件的值就行
  // Optional:有没有父组件都行(但我们知道一定要有父组件)
  constructor(@Optional() readonly parent: BreadcrumbComponent) { }

  // 添加上下文
  // 默认值:implicit 传入值:my
  // myContext = { $implicit: 'world', my: 'jojo' }

  ngOnInit(): void {
  }

}

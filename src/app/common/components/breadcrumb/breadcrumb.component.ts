import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input ,TemplateRef} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None//由父组件控制子组件样式
})
export class BreadcrumbComponent implements OnInit {
  @Input() separatorContent?: TemplateRef<any>
  constructor() { }

  ngOnInit(): void {
  }

}

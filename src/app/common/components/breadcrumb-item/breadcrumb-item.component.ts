import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: ['./breadcrumb-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { last } from 'lodash';

type PageItemType = 'page' | 'prev' | 'next' | 'prev5' | 'next5'
interface PageItem {
  type: string,
  // type: PageItemType,
  num?: number,
  disabled?: boolean
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit {
  // 只需要用户传入3个参数就能控制分页组件 可以组件中设定默认值
  // @Input() total = 0;//总条数 
  // @Input() total = 100;//总条数 可以先写死来展示样式
  @Input() total = 90;//情况1 不超过10页时展示所有标签
  @Input() pageNum = 1;//当前的页数
  @Input() pageSize = 10;//每页展示多少条数据
  private lastNum = 0;//最后一页的页码
  // private listOfPageItems: PageItem[] = [];
  listOfPageItems: PageItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.lastNum = Math.ceil(this.total / this.pageSize)
    this.listOfPageItems = this.getListOfPageBtns(this.pageNum, this.lastNum)
    console.log(this.listOfPageItems);//9+2=11个item
    
console.log(this.lastNum,'this.lastNum');

  }

  private getListOfPageBtns(pageNum: number, lastNum: number): PageItem[] {
    // 有几种情况
    // 1.total=90 即总页数<10时，展示所有页数按钮和左右箭头按钮
    return contactWithPrevNext(generatePage(1, this.lastNum),pageNum,lastNum)
  }

}

// 生成page标签
function generatePage(start: number, end: number): PageItem[] {
  const list = []
  for (let i = start; i <= end; i++) {
    list.push({
      num: i,
      type: 'page',
      disabled: false
    })
  }
  return list
}

// 合并page标签和箭头标签
function contactWithPrevNext(listOfPage: PageItem[], pageNum: number, lastNum: number): PageItem[] {
  return [
    {
      type: 'prev',
      disabled: pageNum === 1
    },
    ...listOfPage,
    {
      type: 'next',
      disabled: pageNum === lastNum
    }
  ]
}

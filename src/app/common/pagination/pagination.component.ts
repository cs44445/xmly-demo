import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { clamp } from 'lodash';

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

// 需要监听total，pageNum，pageSize属性，因为这3个属性一旦有一个发生改变，就要重新走一遍getListOfPageBtns方法的逻辑
export class PaginationComponent implements OnInit, OnChanges {
  // 只需要用户传入3个参数就能控制分页组件 可以组件中设定默认值
  @Input() total = 0;//总条数
  // @Input() total = 90;//情况1 不超过10页时展示所有标签
  // @Input() total = 500;//情况2 超过10页时
  @Input() pageNum = 1;//当前的页数
  // @Input() pageNum = 46;//当前的页数
  @Input() pageSize = 10;//每页展示多少条数据
  @Output() changed = new EventEmitter<number>()//注意：是从@angular/core中导入，而不是从stream中导入这个方法，否则会报错 需要加@Output表示从子组件发出去的数据
  lastNum = 0;//最后一页的页码
  // private listOfPageItems: PageItem[] = [];
  listOfPageItems: PageItem[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lastNum = Math.ceil(this.total / this.pageSize) || 1
    this.listOfPageItems = this.getListOfPageBtns(this.pageNum, this.lastNum)
    // console.log(this.listOfPageItems);//9+2=11个item
  }

  private getListOfPageBtns(pageNum: number, lastNum: number): PageItem[] {
    // 有几种情况
    // 1.total=90 即总页数<10时，展示所有页数按钮和左右箭头按钮
    if (lastNum <= 9) {
      return contactWithPrevNext(generatePage(1, lastNum), pageNum, lastNum)
    } else {
      // 可以直接确定左、右箭头、第一页和最后一页这4个按钮
      const firstPageItem = generatePage(1, 1)
      const lastPageItem = generatePage(lastNum, lastNum)
      let listOfMidPages = []//中间的page按钮
      const prevFiveItem = { type: 'prev5' }
      const nextFiveItem = { type: 'next5' }
      // 如果页码page<4，就显示1-5页码按钮，从5按钮后出现...按钮一直到最后一页按钮
      // 即当前页面按钮<4时，显示按钮为:1,2，3,4,5，...，50
      if (pageNum < 4) {
        listOfMidPages = [...generatePage(2, 5), nextFiveItem]
      } else if (pageNum > lastNum - 4) {
        // 当latName-4: ...,46,47,48,49,50
        // 需要渲染46-49按钮，50按钮已经存在了
        listOfMidPages = [prevFiveItem, ...generatePage(lastNum - 4, lastNum - 1)]
      } else {
        //从4-46，1，...，中间页码按钮，...，50
        // 中间页码可以根据当前点击的按钮来显示：即当前点击了15，那么就显示13,14,15,16,17
        listOfMidPages = [prevFiveItem, ...generatePage(pageNum - 2, pageNum + 2), nextFiveItem]
      }
      return contactWithPrevNext([...firstPageItem, ...listOfMidPages, ...lastPageItem], pageNum, lastNum)
    }
  }

  // { type, num, disabled }赋值解构
  pageClick({ type, num, disabled }: PageItem): void {
    if (!disabled) {
      let newPageNum = this.pageNum
      if (type === 'page') {
        newPageNum = num!
      } else {
        const diff: any = {
          next: 1,
          prev: -1,
          prev5: -5,
          next5: 5
        }
        newPageNum += diff[type]
      }
      // console.log(newPageNum, 'newPageNum');
      // lodash中的clamp()方法:返回限制在 lower 和 upper 之间的值,newPageNum：被限制的值
      this.changed.emit(clamp(newPageNum, 1, this.lastNum))//需要把子组件中变化的值传给父组件
    }
  }

  inputValue(num: number): void{
    if (num > 0) {
      this.pageClick({
        type: 'page',
        num,
      })
    }
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

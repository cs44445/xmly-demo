import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';

@Directive({
  selector: '[appTaggleMore]'
})
export class TaggleMoreDirective implements OnInit, OnChanges {
  @Input() content: string = ''
  @Input() isFull = false
  @Input('appTaggleMore') maxHeight = '0'// @Input('appTaggleMore')取别名
  @Output() initTrueHeight = new EventEmitter<number>()//告诉父组件trueHegiht是多少，因为有的内容很少，没有必要展示点击展开更改的按钮
  private trueHeight = this.maxHeight

  constructor(
    private el: ElementRef,
    private rd2: Renderer2
  ) { }

  ngOnInit(): void {
    // console.log('toggle');
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    const { content, isFull } = changes
    // if (changes['content']?.currentValue) {
    if (content?.currentValue) {
      // const rect = this.el.nativeElement.getBoundingClientRect()
      // console.log(rect, 'rect');//最大高度为992,可以把album.component.less中的max-height先注释掉
      // const { height } = this.hiddenDomRect(this.el.nativeElement)
      // console.log(height);//拿到正确高度就可以设置maxheight
      timer(100).subscribe(() => {//需要有一定延迟才能算出正确高度
        this.trueHeight = this.hiddenDomRect(this.el.nativeElement).height.toString()
        this.initTrueHeight.emit(parseFloat(this.trueHeight))
      })
    }
    // if (changes['isFull']) {
    if (isFull) {//只有full改变时候才会改变
      const maxHeight = isFull.currentValue ? this.trueHeight : this.maxHeight
      this.rd2.setStyle(this.el.nativeElement, 'maxHeight', maxHeight + 'px')
    }
  }

  // 获取隐藏元素尺寸
  // private hiddenDomRect(dom: HTMLElement): void {
  private hiddenDomRect(dom: HTMLElement): DOMRect {
    const cloneNode = dom.cloneNode(true) as HTMLElement//传入true表示整个div node及其中的内容都复制
    this.rd2.setStyle(cloneNode, 'position', 'absolute')//需要给.intro 添加{position: relative}
    this.rd2.setStyle(cloneNode, 'visibility', 'hidden')
    this.rd2.setStyle(cloneNode, 'pointerEvents', 'none')//如果存在事件不能响应事件
    this.rd2.setStyle(cloneNode, 'maxHeight', 'unset')
    this.rd2.appendChild(dom.parentElement, cloneNode)
    const rect = cloneNode.getBoundingClientRect()
    this.rd2.removeChild(dom.parentNode, cloneNode)//移除掉复制的node
    // console.log(rect, 'rect');//height变成0
    return rect
  }

}

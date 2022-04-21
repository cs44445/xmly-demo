import { Component, HostBinding, OnInit, ViewEncapsulation, Input, ElementRef, Renderer2, AfterViewInit, OnChanges, SimpleChanges, SimpleChange, Output,EventEmitter } from '@angular/core';

const ColorPresets = ['magenta', 'orange', 'green']//预设的颜色只能传这3种
type TagMode = 'default' | 'circle'//形状只有这两种
const prefixStr = 'xm-tag-'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less'],
  encapsulation: ViewEncapsulation.None//需要设置这里的视图封装策略，才会在使用app-tag组件时直接在app-tag组件上加样式生效
})
export class TagComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() xmColor = ''//默认没有颜色
  @Input() xmShape: TagMode = 'default'//默认为default形状
  @Input() xmCloseble = false//默认没有关闭icon
  @Output() closed = new EventEmitter<void>()//发射一个关闭事件
  @HostBinding('class.xm-tag-circle') get cicleCls(): boolean { return this.xmShape === 'circle' }//判断是否为circle，返回布尔值
  @HostBinding('class.xm-tag-close') get closeCls(): boolean { return this.xmCloseble }//控制是否有关闭icon
  @HostBinding('class.xm-tag') readonly hostCls = true//这个样式是默认会有的

  private currentPresetCls = ''//用来记录当前的颜色

  // ElementRef获取根元素；Renderer2：加样式class
  constructor(private el: ElementRef, private rd2: Renderer2) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    console.log('after生命周期执行');//等change生命周期执行后才会执行
    // this.setStyle()//所以没有必要在这里初始化，因为this.setStyle()本质只是改变了color的值。而且默认color=''，所以有color就会执行onchanges生命周期，所以直接在onchanges里面调用这个方法即可
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['xmColor'], 'change生命周期执行');
    this.setStyle(changes['xmColor'])
  }
  // 设置颜色 //注意：这里是SimpleChange类型不是SimpleChanges
  private setStyle(color: SimpleChange): void {
    // 拿到组件的根元素，因为是在组件app-tag上加东西
    const hostEl = this.el.nativeElement
    if (!hostEl || !this.xmColor) { return }
    if (this.currentPresetCls) {//不管是什么颜色，只要存在，就先清空
      this.rd2.removeClass(hostEl, this.currentPresetCls)
      this.currentPresetCls = ''
    }
    if (ColorPresets.includes(this.xmColor)) {//如果用户传入的颜色符合预设颜色
      this.currentPresetCls = prefixStr + this.xmColor
      this.rd2.addClass(hostEl, this.currentPresetCls)
      this.rd2.removeStyle(hostEl, 'color')
      this.rd2.removeStyle(hostEl, 'border-color')
      this.rd2.removeStyle(hostEl, 'background-color')
    } else {//用户传入自定义颜色
      this.rd2.setStyle(hostEl, 'color', '#fff')
      this.rd2.setStyle(hostEl, 'border-color', 'transparent')
      this.rd2.setStyle(hostEl, 'background-color', color.currentValue)
    }
  }
}

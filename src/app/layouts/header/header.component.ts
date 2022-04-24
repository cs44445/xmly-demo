import { animate, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Inject, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { User } from 'src/app/services/type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // angular实现动画效果
  animations: [
    trigger('moveUpMotion', [
      state('1', style({
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1
      })),
      transition('* => 1', [
        style({
          transform: 'translateY(-100%)',
          opacity: 0
        }),
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: User = { name: 'jojo', phone: '', password: '' }
  // user: User = { name: '', phone: '', password: '' }
  fix = false
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  // 监听滚动事件 css实现
  ngAfterViewInit(): void {
    fromEvent(this.doc, 'scroll')
      .pipe(debounceTime(300), distinctUntilChanged())//不需要时刻都监听，所以使用节流
      .subscribe(() => {
        const top = this.doc.documentElement.scrollTop;
        // console.log('top', top);
        // console.log(this.el.nativeElement.clientHeight, 'client');
        if (top > this.el.nativeElement.clientHeight) {
          this.fix = true
        } else if (top === 0) {
          this.fix = false
        }
        // console.log(this.fix);
        this.cdr.markForCheck()
      })
  }
}

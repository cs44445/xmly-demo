import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AlbumService } from './services/apis/album.service';
import { CategoryService } from './services/business/category.service';
import { Category } from './services/type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush//添加OnPush策略,此时需要注入ChangeDetectorRef并调用markForCheck方法
})
export class AppComponent implements OnInit {
  title = 'xmly-demo';
  currentCategory?: Category//当前选中高亮的分类
  categories: Category[] = []//存放获取到的分类数组
  categoryPinyin = ''
  subCategory: string[] = []//面包屑后面的部分

  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private categoryServe: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.init()
  }
  private init(): void {
    // 需要同时监听一级和二级导航
    combineLatest(
      this.categoryServe.getCategory(),
      this.categoryServe.getSubCategory()
    ).subscribe(([category, subCategory]) => {
      if (category !== this.categoryPinyin) {
        this.categoryPinyin = category
        if (this.categories.length) {
          this.setCurrentCategory()//多次点击一级菜单面包屑后再次回退时，面包屑的标签需要与浏览器地址栏保持一致
        }
      }
      this.subCategory = subCategory
    })
    this.getAlbumData()//获取面包屑的数据只在初始化的时候调用一次，不用subscribe中，否则初始化的时候会调用两次
  }

  private getAlbumData(): void {
    this.albumServe.categories().subscribe(res => {
      this.categories = res
      this.setCurrentCategory()
      this.cdr.markForCheck()
    })
  }

  // 使得当前的分类变成点击的分类
  changeCategory(category: Category): void {
    if ((this.currentCategory && this.currentCategory.id) !== category.id) {
      // this.currentCategory = category;//因为上面已经调用了setCurrentCategory()，所以不需要这行代码了
      // this.categoryServe.setCategory(category.pinyin)//如果发生改变就往服务中设置值 因为需要缓存pinyin值，所以删除这里
      this.router.navigateByUrl(`albums/${category.pinyin}`)
    }
  }

  private setCurrentCategory(): void {
    this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin)
  }
}

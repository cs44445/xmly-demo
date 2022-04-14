import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.categoryServe.getCategory().subscribe(data => {
      console.log('订阅的一级面包屑分类', data);
      if (data !== this.categoryPinyin) {
        this.categoryPinyin = data
        if (!this.categories.length) {//如果没有数据就发送一次请求，这样触发订阅时就不会重复请求，这样切换一级面包屑分类时不会调接口了
          this.getAlbumData()
        }
      }
    })
  }

  private getAlbumData(): void {
    this.albumServe.categories().subscribe(res => {
      this.categories = res
      this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin)
      this.cdr.markForCheck()
    })
  }

  // 使得当前的分类变成点击的分类
  changeCategory(category: Category): void {
    if ((this.currentCategory && this.currentCategory.id) !== category.id) {
      this.currentCategory = category;
      this.categoryServe.setCategory(category.pinyin)//如果发生改变就往服务中设置值
      this.router.navigateByUrl(`albums/${category.pinyin}`)
    }
  }
}

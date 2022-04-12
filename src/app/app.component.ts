import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlbumService } from './services/apis/album.service';
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
  categoryPinyin = 'youshengshu'
  subCategory: string[] = []//面包屑后面的部分

  constructor(private albumServe: AlbumService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAlbumData()
  }

  private getAlbumData(): void {
    this.albumServe.categories().subscribe(res => {
      console.log(res);
      this.categories = res
      this.currentCategory = this.categories.find(item => item.pinyin === this.categoryPinyin)
      this.cdr.markForCheck()
    })
  }

  // 使得当前的分类变成点击的分类
  changeCategory(category: Category): void {
    if ((this.currentCategory && this.currentCategory.id) !== category.id) {
      this.currentCategory = category;
    }
  }
}

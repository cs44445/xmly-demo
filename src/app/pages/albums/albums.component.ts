import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AlbumService } from 'src/app/services/apis/album.service';
import { CategoryService } from 'src/app/services/business/category.service';
import { AlbumArgs, CategoryInfo, MetaValue, SubCategory } from 'src/app/services/type';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  searchParams: AlbumArgs = {
    category: '',
    subcategory: '',
    meta: '',
    sort: 0,
    page: 1,
    perPage: 30
  }
  categoryInfo?: CategoryInfo

  constructor(
    private albumServe: AlbumService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private categoryServe: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 获取路由参数
    // this.route.paramMap.subscribe(paramMap => {
    //   const pinyin = paramMap.get('pinyin')
    //   this.searchParams.category= pinyin!
    //   console.log(this.searchParams.category,'');
    // })

    // 将一级菜单面包屑与路由参数交互相关联
    combineLatest(//combineLatest合并多个流
      this.categoryServe.getCategory(),
      this.route.paramMap
    ).subscribe(([category, paramMap]) => {
      const pinyin = paramMap.get('pinyin')
      if (pinyin === category) {
        this.searchParams.category = pinyin
        this.searchParams.subcategory=''
        this.updateDate()
      } else {
        // 分类和路径的参数不同时(eg: 点击后退按钮)以参数为准 
        this.categoryServe.setCategory(pinyin!)
        this.router.navigateByUrl('/albums/' + pinyin)
      }
    })
  }

  private updateDate(): void {
    this.albumServe.detailCategoryPageInfo(this.searchParams).subscribe(res => {
      this.categoryInfo = res
      this.cdr.markForCheck()
    })
  }

  changeSubCategory(subcategories?: SubCategory): void {
    if (this.searchParams.subcategory !== subcategories?.code) {
      this.searchParams.subcategory = subcategories?.code || ''
      this.updateDate()
    }
  }
  // 在ngFor中添加travkBy：因为点击事件很平凡，使用trackBy可以优化 https://angular.cn/api/common/NgForOf
  trackBySubcategories(index: number, item: SubCategory): string { return item.code }
  trackByMetas(index: number, item: MetaValue): number { return item.id }
}

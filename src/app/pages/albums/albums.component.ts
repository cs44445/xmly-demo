import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AlbumService } from 'src/app/services/apis/album.service';
import { AlbumArgs, CategoryInfo, MetaValue, SubCategory } from 'src/app/services/type';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  searchParams: AlbumArgs = {
    category: 'youshengshu',
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
  ) { }

  ngOnInit(): void {
    this.updateDate()
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

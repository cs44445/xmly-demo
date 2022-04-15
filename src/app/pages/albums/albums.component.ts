import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, withLatestFrom } from 'rxjs';
import { AlbumService } from 'src/app/services/apis/album.service';
import { CategoryService } from 'src/app/services/business/category.service';
import { Album, AlbumArgs, AlbumInfo, AlbumsInfo, CategoryInfo, CheckedMeta, MetaData, MetaValue, SubCategory } from 'src/app/services/type';
@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  sorts = ["综合排序", '最近更新', '播放最多']
  searchParams: AlbumArgs = {
    category: '',
    subcategory: '',
    meta: '',
    sort: 0,
    page: 1,
    perPage: 30
  }
  categoryInfo?: CategoryInfo
  checkedMetas: CheckedMeta[] = []
  albumsInfo?: AlbumsInfo
  imgUrl = ''

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

    // // 将一级菜单面包屑与路由参数交互相关联  因为使用combineLatest订阅时，一旦路径和一二级菜单发生变化，就会去调接口，所以需要优化
    // combineLatest(//combineLatest合并多个流
    //   this.categoryServe.getCategory(),
    //   this.route.paramMap
    // ).subscribe(([category, paramMap]) => {
    //   const pinyin = paramMap.get('pinyin')
    //   if (pinyin === category) {
    //     this.searchParams.category = pinyin
    //     this.searchParams.subcategory = ''
    //     this.updateDate()
    //   } else {
    //     // 分类和路径的参数不同时(eg: 点击后退按钮)以参数为准
    //     this.categoryServe.setCategory(pinyin!)
    //     this.router.navigateByUrl('/albums/' + pinyin)
    //   }
    // })

    // 优化一级导航会发两次请求
    this.route.paramMap.pipe(withLatestFrom(this.categoryServe.getCategory()))
      .subscribe(([paramMap, category]) => {
        const pinyin = paramMap.get('pinyin')
        if (pinyin !== category) {
          // 分类和路径的参数不同时(eg: 点击后退按钮)以参数为准 
          this.categoryServe.setCategory(pinyin!)
        }
        this.searchParams.category = pinyin!
        this.searchParams.subcategory = ''
        this.categoryServe.setSubCategory([])//点击了二级菜单后重新点击一级菜单需要清空二级菜单
        this.updateData()
      })
  }

  private updateData(): void {
    forkJoin([
      this.albumServe.albums(this.searchParams),
      this.albumServe.detailCategoryPageInfo(this.searchParams)
    ]).subscribe(([albumsInfo, categoryInfo]) => {
      this.categoryInfo = categoryInfo
      this.albumsInfo = albumsInfo
      console.log(this.albumsInfo, 'albumsInfo');
      this.cdr.markForCheck()
    })

    // this.albumServe.detailCategoryPageInfo(this.searchParams).subscribe(res => {
    //   this.categoryInfo = res
    //   this.cdr.markForCheck()
    // })
  }

  // 改变二级菜单
  changeSubCategory(subcategories?: SubCategory): void {
    if (this.searchParams.subcategory !== subcategories?.code) {
      this.searchParams.subcategory = subcategories?.code || ''
      this.categoryServe.setSubCategory([subcategories!.displayValue])//设置面包屑二级数据
      this.updateData()
    }
  }

  changeMeta(metaData: MetaData, metaValue: MetaValue): void {
    // console.log(metaData, '=====row');
    // console.log(metaValue, 'meta');
    this.checkedMetas.push({
      metaRowId: metaData.id,
      metaRowName: metaData.name,
      metaId: metaValue.id,
      metaName: metaValue.displayName
    })
    this.searchParams.meta = this.getMetaParams()
  }

  showMetaRow(name: string) {
    if (this.checkedMetas.length) {
      return this.checkedMetas.findIndex(item => item.metaRowName === name) === -1
    }
    return true
  }

  clearFilter(meta: CheckedMeta | 'clearAll') {
    if (meta === 'clearAll') {
      this.checkedMetas = []
      this.searchParams.meta = ''
    } else {
      const targetIndex = this.checkedMetas.findIndex(item => {
        return (item.metaRowId === meta.metaRowId) && (item.metaId === meta.metaId)
      })
      if (targetIndex > -1) {
        this.checkedMetas.splice(targetIndex, 1)
        this.searchParams.meta = this.getMetaParams()
      }
    }
  }

  private getMetaParams(): string {
    let result = ''
    if (this.checkedMetas.length) {
      this.checkedMetas.forEach(item => {
        result += item.metaRowId + '_' + item.metaId + '-'
      })
    }
    return result.slice(0, -1)//删除末尾拼接的_
  }

  changeSort(index: number): void {
    if (this.searchParams.sort !== index) {
      this.searchParams.sort = index
      this.updateAlbums()
    }
  }

  private updateAlbums(): void {
    this.albumServe.albums(this.searchParams).subscribe(albumsInfo => {
      this.albumsInfo = albumsInfo;
      this.cdr.markForCheck();
    });
    }

  splitImgUrl(url: string) {
    const imgUrl = url.split('!op_type')
    return imgUrl[0]
  }

  // 在ngFor中添加travkBy：因为点击事件很平凡，使用trackBy可以优化 https://angular.cn/api/common/NgForOf
  trackBySubcategories(index: number, item: SubCategory): string { return item.code }
  trackByMetas(index: number, item: MetaValue): number { return item.id }
  trackByAlbums(index: number, item: Album): number { return item.albumId }
}

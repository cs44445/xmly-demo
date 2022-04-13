import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AlbumService } from 'src/app/services/apis/album.service';
import { AlbumArgs, CategoryInfo } from 'src/app/services/type';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {
  searchParms: AlbumArgs = {
    category: 'youshengshu',
    subcategory: '',
    meta: '',
    sort: 0,
    page: 1,
    perPage: 30
  }
  categoryInfo?: CategoryInfo

  constructor(private albumServe: AlbumService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateDate()
  }

  private updateDate(): void {
    this.albumServe.detailCategoryPageInfo(this.searchParms).subscribe(res => {
      this.categoryInfo = res
      console.log(this.categoryInfo,'this.categoryInfo');
      this.cdr.markForCheck()
    })
  }
}

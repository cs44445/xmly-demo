import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlbumService } from 'src/app/services/apis/album.service';
import { CategoryService } from 'src/app/services/business/category.service';
import { AlbumInfo, AlbumTrackArgs, Anchor, RelateAlbum, Track } from 'src/app/services/type';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent implements OnInit {
  value = 258888
  albumInfo?: AlbumInfo
  score: number = 0
  anchor?: Anchor //作者信息
  relateAlbums: RelateAlbum[] = []//右侧相关专辑列表
  tracks: Track[] = []//底部播放列表
  total = 0
  trackParams: AlbumTrackArgs = {//切换页面时的参数
    albumId: '',
    sort: 1,
    pageNum: 1,
    pageSize: 30
  }

  constructor(
    private route: ActivatedRoute,
    private albumServe: AlbumService,
    private categoryServe: CategoryService,//详情页也需要使用面包屑组件
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.trackParams.albumId = this.route.snapshot.paramMap.get('albumId')!
    // const id = this.route.snapshot.paramMap.get('albumId')!
    // // console.log(id, 'id');
    // this.albumServe.album(id).subscribe(res => {
    //   console.log(res, '专辑详情');
    // })
    // this.albumServe.albumScore(id).subscribe(res => {
    //   console.log(res,'分数');
    // })
    // this.albumServe.relateAlbums(id).subscribe(res => {
    //   console.log(res,'相关专辑');
    // })
    forkJoin([
      this.albumServe.album(this.trackParams.albumId),
      this.albumServe.albumScore(this.trackParams.albumId),
      this.albumServe.relateAlbums(this.trackParams.albumId)
    ]).subscribe(([albumInfo, score, relateAlbum]) => {//解构赋值
      console.log('albumInfo', albumInfo);
      // console.log('score', score);
      // console.log('relateAlbum', relateAlbum);
      this.albumInfo = { ...albumInfo.mainInfo, albumId: albumInfo.albumId }//给mainInfo添加albumId字段并赋值给albumInfo
      this.score = score
      this.anchor = albumInfo.anchorInfo
      this.tracks = albumInfo.tracksInfo.tracks
      this.total = albumInfo.tracksInfo.trackTotalCount
      this.relateAlbums = relateAlbum.slice(0, 10)//截取前面10条数据
      this.categoryServe.setSubCategory([this.albumInfo.albumTitle]);//在列表页点击二级菜单音乐后再进入详情页，再次点击音乐返回列表页时，会残留二级菜单，需要清掉
      this.cdr.markForCheck()
    })
  }
}

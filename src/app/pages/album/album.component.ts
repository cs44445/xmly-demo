import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlbumService } from 'src/app/services/apis/album.service';
import { CategoryService } from 'src/app/services/business/category.service';
import { AlbumInfo, AlbumTrackArgs, Anchor, RelateAlbum, Track } from 'src/app/services/type';
import { IconType } from '../../common/directives/type';
interface MoreState {
  full: boolean,
  label: string,
  icon: IconType
}
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
  // htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
  safeHtml?: SafeHtml
  moreState: MoreState = {
    full: false,
    label: '显示全部',
    icon: 'arrow-down-line'
  }
  articleHeight: number = 0

  constructor(
    private route: ActivatedRoute,
    private albumServe: AlbumService,
    private categoryServe: CategoryService,//详情页也需要使用面包屑组件
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // 点击侧边推荐专辑时需要监听路由跳转的参数，路由参数改变后就刷新当前列表
    this.route.paramMap.subscribe(paraMap => {
      this.trackParams.albumId = paraMap.get('albumId')!
      this.initData()
    })
    // this.trackParams.albumId = this.route.snapshot.paramMap.get('albumId')! //获取路由参数
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
    // console.log(this.articleHeight, 'articleHeight');//真实高度
  }

  // 点击展开或收起
  taggleMore(): void {
    this.moreState.full = !this.moreState.full
    if (this.moreState.full) {
      this.moreState.label = '收起'
      this.moreState.icon = 'arrow-up-line'
    } else {
      this.moreState.label = '显示全部'
      this.moreState.icon = 'arrow-down-line'
    }
  }

  // 初始化数据和页面
  private initData(): void {
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
      // this.categoryServe.setSubCategory([this.albumInfo.albumTitle]);//在列表页点击二级菜单音乐后再进入详情页，再次点击音乐返回列表页时，会残留二级菜单，需要清掉
      this.categoryServe.getCategory().subscribe(category => {//随便在导航栏输入一串数字后会重定向到有声书，这时向后导航时面包屑匹配是错的
        const { categoryPinyin } = this.albumInfo!.crumbs
        if (category!==categoryPinyin) {//如果不相等，就设置相等
          this.categoryServe.setSubCategory([categoryPinyin])
        }
      })
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.albumInfo.detailRichIntro)
      this.cdr.markForCheck()
    })
  }
}

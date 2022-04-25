import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumArgs, AlbumsInfo, Base, Category, CategoryInfo, AlbumRes, RelateAlbum } from '../type';
import { environment } from 'src/environments/environment';
// import { stringify } from 'querystring';//
import { stringify } from 'qs';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  readonly baseUrl = `${environment.baseUrl}/xmly/`;
  constructor(private http: HttpClient) { }

  // 一级分类列表
  categories(categoryId = 3): Observable<Category[]> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http
      .get<Base<{ categories: Category[] }>>(`${this.baseUrl}breadcrumb`, { params })//2.所以需要在这里加上泛型即可
      .pipe(map(res => res.data.categories))
    // .pipe(map((res: Base<{ categories: Category[] }>) => res.data.categories));//1.因为直接在这里写会报错
  }

  // 二三级分类 Pick表示选出其中的两个参数:category、subcategory因为专辑列表的接口和分类列表的接口有这两个共同的参数
  detailCategoryPageInfo(args: Pick<AlbumArgs, 'category' | 'subcategory'>): Observable<CategoryInfo> {
    //因为这里传的是一个对象，所以不需要stringify(args将参数转为a=x&b=y的格式,请求的时候会自动转的
    // const params = new HttpParams({ fromString: stringify(args) })
    return this.http
      // .get<Base<CategoryInfo>>(`${this.baseUrl}categories`, { params })
      .get<Base<CategoryInfo>>(`${this.baseUrl}categories`, { params: args })
      .pipe(map(res => res.data))
  }

  // 专辑列表
  albums(args: AlbumArgs): Observable<AlbumsInfo> {
    const person: Test = { age: 0 }
    stringify(person)
    const params = new HttpParams({ fromString: stringify(args) })
    //从querystring引入stringify在这里格式化时会报错，需要重新安装另外的qs库，
    // 但运行时候项目会有警告，需要在package.son中设置：architect{build:{"allowedCommonJsDependencies": ["qs"]}}
    return this.http
      .get<Base<AlbumsInfo>>(`${this.baseUrl}albums`, { params })
      .pipe(map(res => res.data))
  }

  // 专辑详情
  album(albumId: string): Observable<AlbumRes> {
    const params = new HttpParams().set('albumId', albumId)
    return this.http.get<Base<AlbumRes>>(`${this.baseUrl}album`, { params })
      .pipe(map(res => res.data))
  }

  // 评分
  albumScore(albumId: string): Observable<number> {
    return this.http.get<Base<{ albumScore: number }>>(`${this.baseUrl}album-score/${albumId}`)
      .pipe(map(res => res.data.albumScore || 0))//如果没有分数就默认为0
  }

  // 相关专辑列表
  relateAlbums(id: string): Observable<RelateAlbum[]> {
    const params = new HttpParams().set('id', id)
    return this.http.get<Base<{ hotWordAlbums: RelateAlbum[] }>>(`${this.baseUrl}album-relate`, { params })
      .pipe(map(res => res.data.hotWordAlbums))
  }
}

interface Test {
  age: number
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Base, Category } from '../type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  readonly prefix = '/xmly/';
  constructor(private http: HttpClient) { }

  // 一级分类列表
  categories(categoryId = 3): Observable<Category[]> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http
      .get<Base<{ categories: Category[] }>>(`${environment.baseUrl}${this.prefix}breadcrumb`, { params })//2.所以需要在这里加上泛型即可
      .pipe(map(res => res.data.categories))
    // .pipe(map((res: Base<{ categories: Category[] }>) => res.data.categories));//1.因为直接在这里写会报错
  }
}


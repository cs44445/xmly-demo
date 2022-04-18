import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { storageKeys } from 'src/app/constance';
import { WindowService } from '../tools/window.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category$ = new BehaviorSubject<string>('youshengshu')
  private subCategory$ = new BehaviorSubject<string[]>([])

  constructor(private windowServe: WindowService) {
    const catchCategory = this.windowServe.getStorage(storageKeys.categoryPinyin)
    if (catchCategory) {
      this.category$.next(catchCategory)
    }
  }

  setCategory(category: string): void {
    this.windowServe.setStorage(storageKeys.categoryPinyin, category)
    this.category$.next(category)
  }

  getCategory(): Observable<string> {
    return this.category$.asObservable()
  }

  setSubCategory(subCategory: string[]): void {
    this.subCategory$.next(subCategory)
  }

  getSubCategory(): Observable<string[]> {
    return this.subCategory$.asObservable()
  }
}

export interface User {
  name: string;
  phone: string;
  password: string;
}
export interface Category {
  id: number;
  displayName: string;
  pinyin: string;
}
export interface Base<T> {
  ret: number,
  message: string,
  data: T
}
export interface SubCategory {
  id: number,
  displayValue: string,
  code: string
}
export interface MetaValue {
  id: number,
  code: string,
  displayName: string
}
export interface MetaData {
  id: number,
  name: string,
  displayName: string,
  metaValues: MetaValue[]
}
export interface CategoryInfo {
  category: Category,
  currentSubcategory: SubCategory,
  subcategories: SubCategory[],
  metadata: MetaData[]
}

export interface AlbumArgs {
  category: string;
  subcategory: string;
  meta: string;
  sort: number;
  page: number;
  perPage: number;
}
export interface CheckedMeta {
  metaRowId: number,
  metaRowName: string,
  metaId: number,
  metaName: string
}
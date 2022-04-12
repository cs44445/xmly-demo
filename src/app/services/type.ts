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
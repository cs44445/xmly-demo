import { Pipe, PipeTransform } from '@angular/core';
import { round } from 'lodash'
type unitTypes = '万' | '亿'

enum Exponent {
  '万' = 10000,
  '亿' = 100000000
}

interface FormfatNumberConfig {
  unit?: string,
  precision?: number
}

const defaultConfig: FormfatNumberConfig = {
  unit: '万',
  precision: 1
}

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  // 方法1
  // transform(value: number, exponent: unitTypes = '万', limit = 1): number {
  //   // return round(value / 10000, 1);
  //   const multiple = Exponent[exponent]
  //   return round(value / multiple, limit);
  // }

  // 方法2
  transform(value: number, config: FormfatNumberConfig = defaultConfig): number {
    const unit = config.unit || '万'//默认是万 因为以亿做单位有的数量太小了，可能会出现 0亿
    // return round(value / Exponent[unit], config.precision || 1);//直接使用来获取索引会报错 ts使用枚举类型引用报错
    // 解决办法1：使用类型断言
    return round(value / Exponent[unit as keyof typeof Exponent], config.precision || 1);
  }
}

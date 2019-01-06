import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'head'
})
export class HeadPipe implements PipeTransform {

  transform(value: string, n?: number, extra?: number): string {
    n = n || 10;
    extra = extra || 3;

    if (value && value.length > n + extra) {
      return `${value.slice(0, n)}...`;
    }

    return value;
  }

}

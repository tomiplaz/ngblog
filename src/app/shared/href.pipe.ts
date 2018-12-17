import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'href'
})
export class HrefPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value;
    }

    return `http://${value}`;
  }

}

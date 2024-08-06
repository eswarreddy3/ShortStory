import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string, ascending: boolean = true): any[] {
    if (!Array.isArray(array)) {
      return [];
    }

    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return ascending ? -1 : 1;
      } else if (a[field] > b[field]) {
        return ascending ? 1 : -1;
      } else {
        return 0;
      }
    });

    return array;
  }
}

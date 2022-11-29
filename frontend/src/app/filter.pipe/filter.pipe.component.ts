
import { Pipe, PipeTransform } from '@angular/core';
import { debuglog } from 'util';

@Pipe({ name: 'appFilter' })
export class FilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(value: any, args?: any):any {
    if (!value) {
      return null;
    }
    if (!args) {
      return value;
    }
    args = args.toLocaleLowerCase();
debugger;
    return value.filter(function(item)  {
      return JSON.stringify(item).toLocaleLowerCase().includes(args);
    });
  }
}
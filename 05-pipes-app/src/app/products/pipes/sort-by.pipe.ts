import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform<T>(heroes: T[], sortBy?: keyof T): T[] {
    if (sortBy) {
      return heroes.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    return heroes;
  }
}

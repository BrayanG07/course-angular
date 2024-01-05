import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly'
})
export class CanFlyPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    return value ? 'Vuela' : 'No vuela';
  }

}

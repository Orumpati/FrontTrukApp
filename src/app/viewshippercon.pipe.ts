import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'viewshippercon'
})
export class ViewshipperconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

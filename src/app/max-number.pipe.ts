import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'maxNumber'
})
export class MaxNumberPipe implements PipeTransform {

  transform(value: any, args?: any): number {
    if ((value == 0) || (value > 31)) {
      value = null;
    }
    return value;
  }

}

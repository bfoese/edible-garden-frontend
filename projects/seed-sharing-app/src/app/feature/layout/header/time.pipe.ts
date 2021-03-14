import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: number | null | undefined): string | undefined | null {
    if (value === null || value === undefined) {
      return value;
    }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    return `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)}`;
  }
}

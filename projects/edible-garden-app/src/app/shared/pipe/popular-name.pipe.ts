import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'popularName'
})
export class PopularNamePipe implements PipeTransform {
  private readonly stringSeparator = ';';

  transform(value: string): string {
    if (value && 'string' === typeof value) {
      const splitValue = value.split(this.stringSeparator);
      if (splitValue && splitValue.length > 0) {
        return splitValue[0];
      }
    }
    return value;
  }
}

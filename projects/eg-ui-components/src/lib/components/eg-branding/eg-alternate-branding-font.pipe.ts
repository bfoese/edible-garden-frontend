import { Pipe, PipeTransform } from '@angular/core';

/**
 * The pipe wraps a <span> with EgAlternateBrandingFontPipe.cssClassName around
 * characters of the defined text. The position of the characters to be wrapped
 * can be defined. Currently it only supports the first and the last character.
 *
 * This pipe is a workaround for the missing CSS feature to select the last
 * character. Plain CSS only allows to select the first character.
 *
 * @example {{ foo | egAlternateBrandingFont:['first','last']}}
 */
@Pipe({
  name: 'egAlternateBrandingFont'
})
export class EgAlternateBrandingFontPipe implements PipeTransform {
  private static readonly cssClassName = '-egAlternateBrandingFont';

  transform(
    value: string | undefined,
    index: Array<'first' | 'last'>
  ): string | undefined {
    if (
      value !== undefined &&
      value !== null &&
      'string' === typeof value &&
      index &&
      index.length > 0
    ) {
      index.forEach((pos) => {
        if (pos === 'first') {
          value = this.wrap(value!.slice(0, 1)) + value!.slice(1);
        }
        if (pos === 'last') {
          value = value!.slice(0, -1) + this.wrap(value!.slice(-1));
        }
      });
    }
    return value;
  }

  private wrap(value: string): string {
    return `<span class="${EgAlternateBrandingFontPipe.cssClassName}">${value}</span>`;
  }
}

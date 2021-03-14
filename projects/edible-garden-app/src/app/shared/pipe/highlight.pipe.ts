import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egHighlight'
})
export class EgHighlightPipe implements PipeTransform {
  transform(value: string | undefined, highlightPart: string): string | undefined {
    if (
      value !== undefined &&
      'string' === typeof value &&
      highlightPart &&
      'string' === typeof highlightPart &&
      highlightPart.length === 0
    ) {
      const regex = new RegExp(highlightPart, 'gi');
      const match = regex.exec(value);

      return !match
        ? value
        : value.replace(regex, `<span class='eg-highlight'>${match[0]}</span>`);
    }
    return value;
  }
}

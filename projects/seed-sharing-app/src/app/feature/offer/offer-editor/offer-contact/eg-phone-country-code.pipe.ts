import { Pipe, PipeTransform } from '@angular/core';
import { CountryCodeResource } from '@eg-seed/service/country-code-data.service';

@Pipe({
  name: 'egPhoneCountryCode'
})
export class EgPhoneCountryCodePipe implements PipeTransform {
  transform(value: CountryCodeResource, include: ['name'|'nativeName']): string | null {
    if (
      value
    ) {


      const formattedDialCode = (' '.repeat(6) + value.dialCode).slice(-6);

      console.log();

     return formattedDialCode;
    }
    return value;
  }
}

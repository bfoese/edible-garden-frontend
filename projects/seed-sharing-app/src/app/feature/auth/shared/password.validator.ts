import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

/**
 * Pattern which is used on server side for validation. TODO maybe having an API
 * call to get that pattern would be a good idea. Seems not to be exported by
 * openapi:gen
 */
const passwordPattern = /^(?=.*[\S])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zßA-Z\d"'|~+-@$!%*?&\\/§\[\]\{\}\(\)]{8,}$/;

export function EgPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control) {
      return null;
    }

    const baseValidator = Validators.compose([
      Validators.pattern(passwordPattern)
    ]);

    const baseErrors = baseValidator ? baseValidator(control) : null;
    if (baseErrors) {
      return baseErrors;
    }
    return null;
  };
}

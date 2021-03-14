import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function EgUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control) {
      return null;
    }

    const baseValidator = Validators.compose([
      Validators.minLength(2),
      Validators.maxLength(20)
    ]);

    const baseErrors = baseValidator ? baseValidator(control) : null;

    if (baseErrors) {
      return baseErrors;
    }
    return null;
  };
}

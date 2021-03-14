import { AbstractControl, ValidatorFn } from '@angular/forms';
import { SigninUserDto } from '@eg/edible-garden-api/src/public-api';

import { BehaviorSubject } from 'rxjs';

export function EgCredentialsValidator(
  invalidCredentials$: BehaviorSubject<SigninUserDto | null>,
  formCtrlUsername: string,
  formCtrlPassword: string
): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const username = formGroup?.get(formCtrlUsername)?.value;
    const password = formGroup?.get(formCtrlPassword)?.value;

    const invalidCrendentialsObj: SigninUserDto | null = invalidCredentials$?.getValue();
    if (!invalidCrendentialsObj) {
      return null;
    }
    if (
      username === invalidCrendentialsObj.username &&
      password === invalidCrendentialsObj.password
    ) {
      return { invalidCredentials: true };
    }
    return null;
  };
}

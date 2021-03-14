import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Confirms that two form controls contain the same value. Typical use case
 * would be to have a password and a password confirmation field to fill out and
 * this Validator would check if the two fields contain the same password text.
 *
 * @param fieldPath - path of the field that should be used for comparison
 * @param confirmFieldPath - path of the field that will contain the confirm
 * value. This field will receive the ValidationErrors object.
 */
export function EgConfirmValidator(
  fieldPath: string,
  confirmFieldPath: string
): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const passwordCtrl: AbstractControl | null = formGroup.get(fieldPath);
    const confirmCtrl: AbstractControl | null = formGroup.get(confirmFieldPath);

    const passwordValue = passwordCtrl?.value;
    const confirmValue = confirmCtrl?.value;

    const confirmCtrlErrors = confirmCtrl?.errors;

    const VALIDATION_ERROR_KEY = 'confirm';

    if (passwordValue !== confirmValue) {
      // add the error; take care not to override existing errors
      const errorObj = {
        ...confirmCtrlErrors,
        ...{ confirm: true, mustMatch: fieldPath }
      };
      confirmCtrl?.setErrors(errorObj);
    } else {
      // remove only the error that is added by this validator and keep the errors of possibly other validators
      if (
        confirmCtrlErrors &&
        Object.prototype.hasOwnProperty.call(
          confirmCtrlErrors,
          VALIDATION_ERROR_KEY
        )
      ) {
        delete confirmCtrlErrors[VALIDATION_ERROR_KEY];
        confirmCtrl?.setErrors(confirmCtrlErrors);
        // needed for one edge case: when password is being changed (confirm
        // ctrl renders invalid) and the change is then reverted, the confirm
        // ctrl UI did not update here we enforce re-rendering
        confirmCtrl?.updateValueAndValidity();
      }
    }
    // we added the error to the confirmCtrl element and do not want to have it
    // on the form group as well
    return null;
  };
}

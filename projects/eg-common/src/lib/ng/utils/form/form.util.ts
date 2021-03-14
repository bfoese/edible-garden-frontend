import { FormGroup } from '@angular/forms';

export class FormUtil {
  public static resetForm(form: FormGroup): void {
    if (form) {
      form.reset();
      //   for (const key in form.controls) {
      //     form.controls[key].markAsPristine();
      //     form.controls[key].updateValueAndValidity();
      //   }
    }
  }

  public static markControlsAsDirty(form: FormGroup): void {
    form.markAsDirty();
    for (const key in form.controls) {
      // form.controls[key].markAsDirty();
      if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
        form.controls[key].updateValueAndValidity();
      }
    }
  }
}

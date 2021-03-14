import { Component, forwardRef, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'seed-offer-desc-seed',
  templateUrl: './offer-desc-seed.component.html',
  styleUrls: ['./offer-desc-seed.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OfferDescSeedComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OfferDescSeedComponent),
      multi: true
    }
  ]
})
export class OfferDescSeedComponent implements OnDestroy, ControlValueAccessor {
  public form: FormGroup = new FormGroup({
    propagationPart: new FormControl('', [Validators.required]),
    seedPropagationQuality: new FormControl('', []),
    speciesName: new FormControl('', []),
    growingEthics: new FormControl('', [])
  });

  private subscription$ = new Subscription();

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched: () => void = () => {};

  public writeValue(value: any): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }
  public registerOnChange(fn: any): void {
    this.subscription$.add(this.form.valueChanges.subscribe(fn));
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  public validate(c: AbstractControl): ValidationErrors | null {
    return this.form.valid
      ? null
      : { invalidForm: { valid: false, message: 'contact fields invalid' } };
  }
}

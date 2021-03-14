import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors
} from '@angular/forms';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { Subscription } from 'rxjs';

import { OfferDescriptionFormData } from '../contract/offer-description-form-data.interface';

@Component({
  selector: 'seed-offer-desc',
  templateUrl: './offer-desc.component.html',
  styleUrls: ['./offer-desc.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OfferDescComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OfferDescComponent),
      multi: true
    }
  ]
})
export class OfferDescComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  public form!: IFormGroup<OfferDescriptionFormData>;

  private subscription$ = new Subscription();

  public constructor(private readonly formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = (<IFormBuilder>(
      this.formBuilder
    )).group<OfferDescriptionFormData>({
      description: new FormControl('', [])
    });
  }

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
      : { invalidForm: { valid: false, message: 'location fields invalid' } };
  }
}

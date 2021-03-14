import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { IFormBuilder, IFormGroup } from '@rxweb/types';

import { Subscription } from 'rxjs';

import { AddressFormData } from '../contract/address-form-data.interface';

@Component({
  selector: 'seed-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true
    }
  ]
})
export class AddressFormComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  public form!: IFormGroup<AddressFormData>;

  private subscription$ = new Subscription();

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.form = (<IFormBuilder>this.formBuilder).group<AddressFormData>({
      line1: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      countryCode: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ])
    });
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  public onTouched: () => void = () => {
    // placeholder comment
  };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(_c: AbstractControl): ValidationErrors | null {
    return this.form.valid
      ? null
      : { invalidForm: { valid: false, message: 'location fields invalid' } };
  }
}

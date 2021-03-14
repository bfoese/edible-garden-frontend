import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
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
import {
  CountryCodeDataService,
  CountryCodeResource
} from '@eg-seed/service/country-code-data.service';
import { StringUtils } from '@eg/common/src/lib/utils/string';

import { Subscription } from 'rxjs';

@Component({
  selector: 'seed-offer-contact',
  templateUrl: './offer-contact.component.html',
  styleUrls: ['./offer-contact.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OfferContactComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OfferContactComponent),
      multi: true
    }
  ]
})
export class OfferContactComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
    phoneCountryCode: new FormControl('', []),
    showPhone: new FormControl('', []),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  private subscription$ = new Subscription();

  private _countryCodeData: CountryCodeResource[] | undefined;

  public filteredData: CountryCodeResource[] = [];

  private searchExpr: string | undefined = undefined;

  public constructor(
    private readonly countryCodeDataService: CountryCodeDataService
  ) {}

  public ngOnInit(): void {
    this.subscription$.add(
      this.countryCodeDataService
        .getData()
        .subscribe((data) => {
          console.log('received data', data);
          this.countryCodeData = data;
        })
    );
  }

  private set countryCodeData(data: CountryCodeResource[] | undefined) {
    this._countryCodeData = data;

    this.filteredData = this._countryCodeData ?? [];
    console.log('update filtered', this.filteredData);
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }

  search(value: string): void {
    //console.log('search', value);

    // if (!value || !this.phoneCountryCodes) {
    //   return
    // }

    // this.filteredData = this.phoneCountryCodes.filter((phoneCountryCode) => StringUtils.someContains([phoneCountryCode.name, phoneCountryCode.nativeName, phoneCountryCode.dial_code, phoneCountryCode.code], value, true));
  }

  nzFilterOption = (value: any, elem: any): boolean => {

    const data: CountryCodeResource = elem?.key;

    return StringUtils.someContains([data?.name, data?.nativeName, data?.dialCode, data?.code], value, true);

    // console.log('filter value', value, bar);
    // return true;
  };

  // public getFormValues() {
  //   const formValues = this.form?.value;
  //   if (formValues) {
  //     return {
  //       name: formValues.name,
  //       phone: formValues.phone,
  //       phoneCountryCode: formValues.phoneCountryCode,
  //       email: formValues.email,
  //       showPhone: formValues.showPhone
  //     }
  //   }
  // }

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

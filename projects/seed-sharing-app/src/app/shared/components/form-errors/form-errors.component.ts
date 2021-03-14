import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'seed-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnDestroy {
  private subscriptionFormChanges$ = new Subscription();

  public _control!: AbstractControl;

  @Input()
  public styled = false;

  @HostBinding('class.--empty') isEmpty = true;

  public get control(): AbstractControl {
    return this._control;
  }

  @Input()
  public set control(val: AbstractControl) {
    this._control = val;
    this.revalidateEmpty();
    if (this._control) {
      this.subscriptionFormChanges$.add(
        this._control.statusChanges.subscribe((change) => this.revalidateEmpty())
      );
    }
  }

  @HostBinding('class.ant-form-item-explain')
  @HostBinding('class.ant-form-item-explain-error')
  public get addDefaultAntStyle(): boolean {
    return this.styled;
  }

  private revalidateEmpty(): void {
    this.isEmpty = !this._control || !this._control.errors;
  }

  ngOnDestroy(): void {
    this.subscriptionFormChanges$.unsubscribe();
  }
}

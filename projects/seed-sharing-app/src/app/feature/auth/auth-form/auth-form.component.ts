import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'seed-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {

  @Input()
  public titleTmpl!: TemplateRef<any>;

  @Input()
  public formTmpl!: TemplateRef<any>;
}

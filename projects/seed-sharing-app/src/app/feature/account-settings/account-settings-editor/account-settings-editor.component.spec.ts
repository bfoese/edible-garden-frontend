import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsEditorComponent } from './account-settings-editor.component';

describe('AccountSettingsEditorComponent', () => {
  let component: AccountSettingsEditorComponent;
  let fixture: ComponentFixture<AccountSettingsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSettingsEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

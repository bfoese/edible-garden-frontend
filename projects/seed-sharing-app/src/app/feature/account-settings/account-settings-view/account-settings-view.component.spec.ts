import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsViewComponent } from './account-settings-view.component';

describe('AccountSettingsViewComponent', () => {
  let component: AccountSettingsViewComponent;
  let fixture: ComponentFixture<AccountSettingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSettingsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

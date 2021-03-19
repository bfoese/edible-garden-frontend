import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapModule } from '@eg-seed/feature/map/map/map.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import {
  egCornerBranch,
  EgIconModule,
  EgIconRegistry
} from 'projects/eg-ui-dynamic-icons/src/public-api';

import { AccountSettingsEditorComponent } from './account-settings-editor/account-settings-editor.component';
import { AccountSettingsRoutingModule } from './account-settings-routing.module';
import { AccountSettingsViewComponent } from './account-settings-view/account-settings-view.component';
import { ProfileContactComponent } from './profile-contact/profile-contact.component';

@NgModule({
  declarations: [AccountSettingsEditorComponent, AccountSettingsViewComponent, ProfileContactComponent],
  imports: [
    CommonModule,
    AccountSettingsRoutingModule,
    NzListModule,
    FormsModule,
    NzButtonModule,
    EgIconModule,
    MapModule
  ]
})
export class AccountSettingsModule {
  constructor(private iconRegistry: EgIconRegistry) {
    this.iconRegistry.registerIcon(egCornerBranch);
  }
}

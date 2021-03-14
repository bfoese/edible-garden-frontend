import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsEditorComponent } from './account-settings-editor/account-settings-editor.component';
import { AccountSettingsViewComponent } from './account-settings-view/account-settings-view.component';
import { AccountSettingsResolver } from './account-settings.resolver';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsViewComponent,
    resolve: { accountSettings: AccountSettingsResolver }
  },
  {
    path: 'edit',
    component: AccountSettingsEditorComponent,
    resolve: { accountSettings: AccountSettingsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSettingsRoutingModule {}

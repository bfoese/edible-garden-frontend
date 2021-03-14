import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NzSelectModule,
    NzRadioModule,
    NzDividerModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}

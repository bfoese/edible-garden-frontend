import { Component } from '@angular/core';

@Component({
  selector: 'eg-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private lenghtUnits = ['metric', 'imperial'];
  private temperatureUnits = ['Celsius', 'Fahrenheit'];

  public getLengthUnits(): string[] {
    return this.lenghtUnits;
  }

  public getTemperatureUnits(): string[] {
    return this.temperatureUnits;
  }
}

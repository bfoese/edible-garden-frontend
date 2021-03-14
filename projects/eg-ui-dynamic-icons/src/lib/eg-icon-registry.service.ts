import { Injectable } from '@angular/core';

import { EgIcon } from './gen/eg-icon.model';

@Injectable({
  providedIn: 'root'
})
export class EgIconRegistry {
  private registry = new Map<string, string>();

  public registerIcon(...icons: EgIcon[]): void {
    if (icons) {
      icons.forEach((icon: EgIcon) =>
        this.registry.set(icon.name, icon.data)
      );
    }
  }

  public getIcon(iconName: string): string | undefined {
    if (!this.registry.has(iconName)) {
      console.warn(`EgIcon not found in registry: ${iconName}`);
    }
    return this.registry.get(iconName);
  }
}

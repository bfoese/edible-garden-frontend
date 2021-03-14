import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  Optional
} from '@angular/core';

import { EgIconRegistry } from './eg-icon-registry.service';

@Component({
  selector: 'eg-icon',
  template: `<ng-content></ng-content>`,
  styleUrls: [
    './eg-icon.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EgIconComponent {
  private svgIcon: SVGElement | undefined;

  @Input()
  set name(iconName: string) {
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.iconRegistry.getIcon(iconName);
    if (svgData) {
      this.svgIcon = this.svgElementFromString(svgData);
      this.element.nativeElement.appendChild(this.svgIcon);
    }
  }

  constructor(
    private element: ElementRef,
    private iconRegistry: EgIconRegistry,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {}

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }
}

import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { EG_PRODUCT, EgProduct } from '@eg/common/src/eg/injectors/eg-product';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';

/**
 * Component to render name of the brand, name of the product and a
 * brand/product logo.
 */
@Component({
  selector: 'eg-branding',
  templateUrl: './eg-branding.component.html',
  styleUrls: ['./eg-branding.component.scss'],
  encapsulation: ViewEncapsulation.None // needed to style the outerHtml from the pipe
})
export class EgBrandingComponent {
  public EgIconType = EgIconType;

  @Input()
  public linkBaseHref = false;

  public readonly brandName;
  public readonly productName;

  public constructor(@Inject(EG_PRODUCT) public readonly egProduct: EgProduct) {
    this.brandName = egProduct?.brandName;
    this.productName = egProduct?.productName;
  }
}

import { InjectionToken } from '@angular/core';

export type EgProduct = { brandName: string, productName: string };

export const EG_PRODUCT = new InjectionToken<EgProduct>(
    'eg.product'
  );

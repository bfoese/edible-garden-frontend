/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = '';
}

/**
 * Parameters for `EgE2EApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}

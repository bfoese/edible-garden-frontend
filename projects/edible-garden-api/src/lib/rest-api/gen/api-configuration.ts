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
 * Parameters for `EdibleGardenApiModule.forRoot()`
 */
export interface ApiConfigurationParams {
  rootUrl?: string;
}

/* eslint-disable */
import { Injectable } from '@angular/core';

/**
 * Global configuration
 */
@Injectable({
  providedIn: 'root',
})
export class EgAuthConfig {
  authHeaderUris: string[] = [];
}


export interface EgAuthConfigParams {
  /**
   * This config property is a whitelist to determine, if the authorization header
   * must be appended on an outgoing request. Only requests to URLs contained
   * in the given array will be enhanced with the authorization header. All
   * other request will NOT be enhanced with this sensitive header for security
   * reasons.
   */
  authHeaderUris: string[];
}

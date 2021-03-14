/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PatchSeedSharingAccountDto } from '../models/patch-seed-sharing-account-dto';
import { SeedSharingAccountDto } from '../models/seed-sharing-account-dto';

@Injectable({
  providedIn: 'root',
})
export class SeedSharingAccountService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation seedSharingAccountControllerGetSettings
   */
  static readonly SeedSharingAccountControllerGetSettingsPath = '/edible-garden/v1/seed-sharing/account/settings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seedSharingAccountControllerGetSettings()` instead.
   *
   * This method doesn't expect any request body.
   */
  seedSharingAccountControllerGetSettings$Response(params?: {
  }): Observable<StrictHttpResponse<SeedSharingAccountDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeedSharingAccountService.SeedSharingAccountControllerGetSettingsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeedSharingAccountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seedSharingAccountControllerGetSettings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seedSharingAccountControllerGetSettings(params?: {
  }): Observable<SeedSharingAccountDto> {

    return this.seedSharingAccountControllerGetSettings$Response(params).pipe(
      map((r: StrictHttpResponse<SeedSharingAccountDto>) => r.body as SeedSharingAccountDto)
    );
  }

  /**
   * Path part for operation seedSharingAccountControllerPatchSettings
   */
  static readonly SeedSharingAccountControllerPatchSettingsPath = '/edible-garden/v1/seed-sharing/account/settings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seedSharingAccountControllerPatchSettings()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  seedSharingAccountControllerPatchSettings$Response(params: {
    body: PatchSeedSharingAccountDto
  }): Observable<StrictHttpResponse<SeedSharingAccountDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeedSharingAccountService.SeedSharingAccountControllerPatchSettingsPath, 'patch');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeedSharingAccountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seedSharingAccountControllerPatchSettings$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  seedSharingAccountControllerPatchSettings(params: {
    body: PatchSeedSharingAccountDto
  }): Observable<SeedSharingAccountDto> {

    return this.seedSharingAccountControllerPatchSettings$Response(params).pipe(
      map((r: StrictHttpResponse<SeedSharingAccountDto>) => r.body as SeedSharingAccountDto)
    );
  }

}

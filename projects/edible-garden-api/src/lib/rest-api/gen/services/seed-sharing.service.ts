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
import { SeedSharingOfferCreationDto } from '../models/seed-sharing-offer-creation-dto';
import { SeedSharingOfferDto } from '../models/seed-sharing-offer-dto';

@Injectable({
  providedIn: 'root',
})
export class SeedSharingService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation seedSharingOfferControllerCreateOffer
   */
  static readonly SeedSharingOfferControllerCreateOfferPath = '/edible-garden/v1/seed-sharing/offer/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seedSharingOfferControllerCreateOffer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  seedSharingOfferControllerCreateOffer$Response(params: {
    body: SeedSharingOfferCreationDto
  }): Observable<StrictHttpResponse<SeedSharingOfferDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeedSharingService.SeedSharingOfferControllerCreateOfferPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeedSharingOfferDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seedSharingOfferControllerCreateOffer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  seedSharingOfferControllerCreateOffer(params: {
    body: SeedSharingOfferCreationDto
  }): Observable<SeedSharingOfferDto> {

    return this.seedSharingOfferControllerCreateOffer$Response(params).pipe(
      map((r: StrictHttpResponse<SeedSharingOfferDto>) => r.body as SeedSharingOfferDto)
    );
  }

  /**
   * Path part for operation seedSharingOfferControllerFindOne
   */
  static readonly SeedSharingOfferControllerFindOnePath = '/edible-garden/v1/seed-sharing/offer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seedSharingOfferControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  seedSharingOfferControllerFindOne$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<SeedSharingOfferDto>> {

    const rb = new RequestBuilder(this.rootUrl, SeedSharingService.SeedSharingOfferControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SeedSharingOfferDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seedSharingOfferControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seedSharingOfferControllerFindOne(params: {
    id: string;
  }): Observable<SeedSharingOfferDto> {

    return this.seedSharingOfferControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<SeedSharingOfferDto>) => r.body as SeedSharingOfferDto)
    );
  }

  /**
   * Path part for operation seedSharingOfferControllerFindByUser
   */
  static readonly SeedSharingOfferControllerFindByUserPath = '/edible-garden/v1/seed-sharing/offer/user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seedSharingOfferControllerFindByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  seedSharingOfferControllerFindByUser$Response(params: {
    userId: string;
  }): Observable<StrictHttpResponse<Array<SeedSharingOfferDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SeedSharingService.SeedSharingOfferControllerFindByUserPath, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeedSharingOfferDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seedSharingOfferControllerFindByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seedSharingOfferControllerFindByUser(params: {
    userId: string;
  }): Observable<Array<SeedSharingOfferDto>> {

    return this.seedSharingOfferControllerFindByUser$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeedSharingOfferDto>>) => r.body as Array<SeedSharingOfferDto>)
    );
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

    const rb = new RequestBuilder(this.rootUrl, SeedSharingService.SeedSharingAccountControllerGetSettingsPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, SeedSharingService.SeedSharingAccountControllerPatchSettingsPath, 'patch');
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

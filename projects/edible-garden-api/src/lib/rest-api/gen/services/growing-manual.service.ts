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

import { GrowingManualDto } from '../models/growing-manual-dto';

@Injectable({
  providedIn: 'root',
})
export class GrowingManualService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation growingManualControllerFindAll
   */
  static readonly GrowingManualControllerFindAllPath = '/edible-garden/v1/growing-manual';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `growingManualControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  growingManualControllerFindAll$Response(params?: {
  }): Observable<StrictHttpResponse<Array<GrowingManualDto>>> {

    const rb = new RequestBuilder(this.rootUrl, GrowingManualService.GrowingManualControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<GrowingManualDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `growingManualControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  growingManualControllerFindAll(params?: {
  }): Observable<Array<GrowingManualDto>> {

    return this.growingManualControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<GrowingManualDto>>) => r.body as Array<GrowingManualDto>)
    );
  }

  /**
   * Path part for operation growingManualControllerFindOne
   */
  static readonly GrowingManualControllerFindOnePath = '/edible-garden/v1/growing-manual/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `growingManualControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  growingManualControllerFindOne$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<GrowingManualDto>> {

    const rb = new RequestBuilder(this.rootUrl, GrowingManualService.GrowingManualControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GrowingManualDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `growingManualControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  growingManualControllerFindOne(params: {
    id: string;
  }): Observable<GrowingManualDto> {

    return this.growingManualControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<GrowingManualDto>) => r.body as GrowingManualDto)
    );
  }

}

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

import { MixedCultureDto } from '../models/mixed-culture-dto';

@Injectable({
  providedIn: 'root',
})
export class MixedCultureService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation mixedCultureControllerFindAll
   */
  static readonly MixedCultureControllerFindAllPath = '/edible-garden/v1/mixed-culture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mixedCultureControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  mixedCultureControllerFindAll$Response(params?: {
  }): Observable<StrictHttpResponse<Array<MixedCultureDto>>> {

    const rb = new RequestBuilder(this.rootUrl, MixedCultureService.MixedCultureControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<MixedCultureDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mixedCultureControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mixedCultureControllerFindAll(params?: {
  }): Observable<Array<MixedCultureDto>> {

    return this.mixedCultureControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<MixedCultureDto>>) => r.body as Array<MixedCultureDto>)
    );
  }

}

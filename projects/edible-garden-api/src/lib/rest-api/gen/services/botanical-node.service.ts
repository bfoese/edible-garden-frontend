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

import { BotanicalNodeDto } from '../models/botanical-node-dto';
import { BotanicalTreeNodeDto } from '../models/botanical-tree-node-dto';

@Injectable({
  providedIn: 'root',
})
export class BotanicalNodeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation botanicalNodeControllerGetTree
   */
  static readonly BotanicalNodeControllerGetTreePath = '/edible-garden/v1/botanical-node/tree';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `botanicalNodeControllerGetTree()` instead.
   *
   * This method doesn't expect any request body.
   */
  botanicalNodeControllerGetTree$Response(params?: {
  }): Observable<StrictHttpResponse<Array<BotanicalTreeNodeDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BotanicalNodeService.BotanicalNodeControllerGetTreePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BotanicalTreeNodeDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `botanicalNodeControllerGetTree$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  botanicalNodeControllerGetTree(params?: {
  }): Observable<Array<BotanicalTreeNodeDto>> {

    return this.botanicalNodeControllerGetTree$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BotanicalTreeNodeDto>>) => r.body as Array<BotanicalTreeNodeDto>)
    );
  }

  /**
   * Path part for operation botanicalNodeControllerFindOne
   */
  static readonly BotanicalNodeControllerFindOnePath = '/edible-garden/v1/botanical-node/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `botanicalNodeControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  botanicalNodeControllerFindOne$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<BotanicalNodeDto>> {

    const rb = new RequestBuilder(this.rootUrl, BotanicalNodeService.BotanicalNodeControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BotanicalNodeDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `botanicalNodeControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  botanicalNodeControllerFindOne(params: {
    id: string;
  }): Observable<BotanicalNodeDto> {

    return this.botanicalNodeControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<BotanicalNodeDto>) => r.body as BotanicalNodeDto)
    );
  }

}

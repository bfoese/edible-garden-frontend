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

import { E2EEmailDto } from '../models/e-2-e-email-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationE2EService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authenticationE2EControllerFindEmails
   */
  static readonly AuthenticationE2EControllerFindEmailsPath = '/edible-garden/v1/e2e/auth/emails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationE2EControllerFindEmails()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationE2EControllerFindEmails$Response(params: {
    recipientEmail: string;

    /**
     * Filters emails whose internal date (disregarding time and timezone) is within or later than the specified date. Provided time/timezone are being completely ignored.
     */
    since?: string;
  }): Observable<StrictHttpResponse<Array<E2EEmailDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationE2EService.AuthenticationE2EControllerFindEmailsPath, 'get');
    if (params) {
      rb.query('recipientEmail', params.recipientEmail, {});
      rb.query('since', params.since, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<E2EEmailDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationE2EControllerFindEmails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationE2EControllerFindEmails(params: {
    recipientEmail: string;

    /**
     * Filters emails whose internal date (disregarding time and timezone) is within or later than the specified date. Provided time/timezone are being completely ignored.
     */
    since?: string;
  }): Observable<Array<E2EEmailDto>> {

    return this.authenticationE2EControllerFindEmails$Response(params).pipe(
      map((r: StrictHttpResponse<Array<E2EEmailDto>>) => r.body as Array<E2EEmailDto>)
    );
  }

  /**
   * Path part for operation authenticationE2EControllerDeleteAccountWithoutAuthentication
   */
  static readonly AuthenticationE2EControllerDeleteAccountWithoutAuthenticationPath = '/edible-garden/v1/e2e/auth/account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationE2EControllerDeleteAccountWithoutAuthentication()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationE2EControllerDeleteAccountWithoutAuthentication$Response(params?: {
    email?: string;
    username?: string;
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationE2EService.AuthenticationE2EControllerDeleteAccountWithoutAuthenticationPath, 'delete');
    if (params) {
      rb.query('email', params.email, {});
      rb.query('username', params.username, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationE2EControllerDeleteAccountWithoutAuthentication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationE2EControllerDeleteAccountWithoutAuthentication(params?: {
    email?: string;
    username?: string;
  }): Observable<{  }> {

    return this.authenticationE2EControllerDeleteAccountWithoutAuthentication$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

}

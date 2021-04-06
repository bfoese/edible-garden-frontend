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

import { PatchPasswordDto } from '../models/patch-password-dto';
import { SendAccountActionLinkDto } from '../models/send-account-action-link-dto';
import { SigninResponseDto } from '../models/signin-response-dto';
import { SigninUserDto } from '../models/signin-user-dto';
import { SignupUserDto } from '../models/signup-user-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authenticationControllerSendAccountActionEmail
   */
  static readonly AuthenticationControllerSendAccountActionEmailPath = '/edible-garden/auth/account-action-email';

  /**
   * Request account activation email, reset password email, delete account
   * email to be send to the users email account.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerSendAccountActionEmail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerSendAccountActionEmail$Response(params: {
    body: SendAccountActionLinkDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerSendAccountActionEmailPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Request account activation email, reset password email, delete account
   * email to be send to the users email account.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerSendAccountActionEmail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerSendAccountActionEmail(params: {
    body: SendAccountActionLinkDto
  }): Observable<void> {

    return this.authenticationControllerSendAccountActionEmail$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authenticationControllerSignup
   */
  static readonly AuthenticationControllerSignupPath = '/edible-garden/auth/signup';

  /**
   * Register a new user account
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerSignup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerSignup$Response(params: {
    body: SignupUserDto
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerSignupPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * Register a new user account
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerSignup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerSignup(params: {
    body: SignupUserDto
  }): Observable<boolean> {

    return this.authenticationControllerSignup$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation authenticationControllerVerifyEmail
   */
  static readonly AuthenticationControllerVerifyEmailPath = '/edible-garden/auth/verify-email';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerVerifyEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerVerifyEmail$Response(params: {
    token: string;
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerVerifyEmailPath, 'get');
    if (params) {
      rb.query('token', params.token, {});
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
   * To access the full response (for headers, for example), `authenticationControllerVerifyEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerVerifyEmail(params: {
    token: string;
  }): Observable<{  }> {

    return this.authenticationControllerVerifyEmail$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation authenticationControllerDeleteAccount
   */
  static readonly AuthenticationControllerDeleteAccountPath = '/edible-garden/auth/delete-account';

  /**
   * This is a GET even though there will be a change performed. This request
   * will show up within an Email. Using a POST with a form and submit button in
   * the Email might cause a popup to show up or even worse a popup being
   * blocked. For more inexperienced users the link with the GET request is
   * better.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerDeleteAccount()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerDeleteAccount$Response(params: {
    token: string;
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerDeleteAccountPath, 'get');
    if (params) {
      rb.query('token', params.token, {});
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
   * This is a GET even though there will be a change performed. This request
   * will show up within an Email. Using a POST with a form and submit button in
   * the Email might cause a popup to show up or even worse a popup being
   * blocked. For more inexperienced users the link with the GET request is
   * better.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerDeleteAccount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerDeleteAccount(params: {
    token: string;
  }): Observable<{  }> {

    return this.authenticationControllerDeleteAccount$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation authenticationControllerRefresh
   */
  static readonly AuthenticationControllerRefreshPath = '/edible-garden/auth/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerRefresh()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerRefresh$Response(params?: {
  }): Observable<StrictHttpResponse<SigninResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerRefreshPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SigninResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerRefresh$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerRefresh(params?: {
  }): Observable<SigninResponseDto> {

    return this.authenticationControllerRefresh$Response(params).pipe(
      map((r: StrictHttpResponse<SigninResponseDto>) => r.body as SigninResponseDto)
    );
  }

  /**
   * Path part for operation authenticationControllerSignin
   */
  static readonly AuthenticationControllerSigninPath = '/edible-garden/auth/signin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerSignin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerSignin$Response(params: {
    body: SigninUserDto
  }): Observable<StrictHttpResponse<SigninResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerSigninPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SigninResponseDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerSignin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerSignin(params: {
    body: SigninUserDto
  }): Observable<SigninResponseDto> {

    return this.authenticationControllerSignin$Response(params).pipe(
      map((r: StrictHttpResponse<SigninResponseDto>) => r.body as SigninResponseDto)
    );
  }

  /**
   * Path part for operation authenticationControllerSignout
   */
  static readonly AuthenticationControllerSignoutPath = '/edible-garden/auth/signout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerSignout()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerSignout$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerSignoutPath, 'post');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerSignout$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerSignout(params?: {
  }): Observable<void> {

    return this.authenticationControllerSignout$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authenticationControllerSigninWithGoogle
   */
  static readonly AuthenticationControllerSigninWithGooglePath = '/edible-garden/auth/google';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerSigninWithGoogle()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerSigninWithGoogle$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerSigninWithGooglePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerSigninWithGoogle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authenticationControllerSigninWithGoogle(params?: {
  }): Observable<void> {

    return this.authenticationControllerSigninWithGoogle$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authenticationControllerPatchPassword
   */
  static readonly AuthenticationControllerPatchPasswordPath = '/edible-garden/auth/password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationControllerPatchPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerPatchPassword$Response(params: {
    body: PatchPasswordDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationService.AuthenticationControllerPatchPasswordPath, 'patch');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authenticationControllerPatchPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authenticationControllerPatchPassword(params: {
    body: PatchPasswordDto
  }): Observable<void> {

    return this.authenticationControllerPatchPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringUtils } from '@eg/common/src/lib/utils/string';

import { Observable } from 'rxjs';

import { EgAuthFacadeService } from './eg-auth-facade.service';
import { EgAuthConfig } from './eg-auth.config';

/**
 * Enhances the request header with the authorization bearer token, but only if
 * the request URL is pointing to one of the configured whitelisted auth header
 * URLs.
 */
@Injectable({
  providedIn: 'root'
})
export class EgAuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: EgAuthFacadeService,
    private egAuthConfig: EgAuthConfig
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const egAuthHeaderUris = this.egAuthConfig.authHeaderUris;
    const sessionToken = this.authService.getSessionToken();
    return next.handle(
      this.addAuthorizationHeader(req, sessionToken, egAuthHeaderUris)
    );
  }

  private addAuthorizationHeader(
    req: HttpRequest<any>,
    token: string | null,
    egAuthHeaderUris: string[] | undefined
  ): HttpRequest<any> {
    if (token && this.isUrlWhitelisted(req, egAuthHeaderUris)) {
      return req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    return req;
  }

  private isUrlWhitelisted(
    req: HttpRequest<any>,
    whitelistedUrls: string[] | undefined
  ): boolean {
    if (!req || !whitelistedUrls || whitelistedUrls.length === 0) {
      return false;
    }
    return whitelistedUrls.some((whitelistedUrl) =>
      StringUtils.contains(req.url, whitelistedUrl, true)
    );
  }
}

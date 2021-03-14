import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EgI18nService } from '../../i18n/lib/eg-i18n.service';

/**
 * Enhances the request with a header indicating the users preferred locale,
 * which is the one currently active from the locale switch. The server may use
 * this for cases where the user is not logged in yet.
 */
@Injectable({
  providedIn: 'root'
})
export class EgPreferredLocaleInterceptor implements HttpInterceptor {
  constructor(private readonly egI18nService: EgI18nService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentLocale = this.egI18nService.getCurrentLocale();
    return next.handle(this.addPreferredLocaleHeader(req, currentLocale));
  }

  private addPreferredLocaleHeader(
    req: HttpRequest<any>,
    preferredLocale: string | null
  ): HttpRequest<any> {
    if (preferredLocale) {
      return req.clone({
        headers: req.headers.set('x-eg-lang', preferredLocale)
      });
    }
    return req;
  }
}

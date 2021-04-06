import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { HTTP_DEFAULT_TIMEOUT } from './http-default-timeout.token';

/**
 * Heroku backend goes to sleep after a while. The first request to the sleeping
 * backend server usually times out - the user would need to click a second
 * time. Also the E2E tests behave flaky because of it. The timeout should be
 * long enough to wait for the backend to wake up and respond.
 *
 * Default timeout can be overriden for each request:
 *
 * @example http.get('/custom/url', { headers: new HttpHeaders({ timeout: `${10000}` }) });
 */
@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {

  constructor(@Inject(HTTP_DEFAULT_TIMEOUT) protected defaultTimeout: number) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const timeoutValue = req.headers.get('timeout') ?? this.defaultTimeout;
    const timeoutValueNumeric = Number(timeoutValue);

    return next.handle(req).pipe(timeout(timeoutValueNumeric));
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

/**
 * Appends the 'withCredentials' option to the header of the requests. Without
 * this flag being set, no cookies will be sent to the server. On server side
 * CORS must be enabled with CORS options "credentials=true", otherwise the
 * cookies will be blocked.
 */
@Injectable({
  providedIn: 'root',
})
export class EgCookieInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true
    });

    return next.handle(req);
  }
}

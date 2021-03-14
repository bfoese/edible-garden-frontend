import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return next
      .handle(req)
      .pipe(catchError((error) => this.handleError(error)));
  }

  private handleError(error: any): ObservableInput<any> {
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 404: {
          break;
        }
        case 500: {
          // Internal Server Error
          // show Message
          break;
        }
        case 503: {
          // Service unavailable
          // Show server maintenance message
          break;
        }
      }
    }
    return throwError(error);
  }
}

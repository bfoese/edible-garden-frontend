import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpRetryStrategy } from '@eg/common/src/lib/utils/rxjs';

import { Observable, of } from 'rxjs';
import { map, retryWhen, share } from 'rxjs/operators';

export type CountryCodeResource = {
  name: string;
  nativeName?: string;
  dialCode: string;
  code: string;
  flag: string;
  preferred?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class CountryCodeDataService {
  private readonly resourceUrl = 'assets/country-codes.json';

  private cache$:
    | Observable<Array<CountryCodeResource>>
    | undefined = undefined;

  constructor(private http: HttpClient) {}

  public getData(): Observable<Array<CountryCodeResource>> {
    if (!this.cache$) {
      try {
        this.cache$ = this.loadData().pipe(
          share(),
          retryWhen(
            httpRetryStrategy({
              maxRetryAttempts: 5,
              scalingDuration: 2000,
              // 404 -when resource not found, makes no sense to retry
              excludedStatusCodes: [500, 404],
              finalizeCallback: () => {
              }
            })
          )
        );
        return this.cache$;
      } catch (finalError) {
        // on final error reset the cache object to allow new requests
        this.cache$ = undefined;
        return of([]);
      }
    }
    return this.cache$;
  }

  public loadData(): Observable<any> {
    return this.http
      .get(this.resourceUrl)
      .pipe(map((response: any) => response));
  }
}

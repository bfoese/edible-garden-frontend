import { HttpErrorResponse } from '@angular/common/http';

import { Observable, timer } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

export interface HttpRetryStrategyOptions {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
  finalizeCallback?: () => void;
}

export const httpRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 1000,
  excludedStatusCodes = [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  finalizeCallback = (): any => {}
}: HttpRetryStrategyOptions = {}) => (
  attempts: Observable<HttpErrorResponse>
) => {
  return attempts.pipe(
    mergeMap((error, i) => {
      const retryAttempt = i + 1;
      // if maximum number of retries have been met
      // or response is a status code we don't wish to retry, throw error
      if (
        error instanceof TypeError ||
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.find((e) => e === error.status)
      ) {
        throw error;
      }
      return timer(retryAttempt * scalingDuration);
    }),
    finalize(finalizeCallback)
  );
};

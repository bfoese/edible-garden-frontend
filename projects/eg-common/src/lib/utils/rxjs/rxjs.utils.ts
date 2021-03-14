

import { Observable } from 'rxjs';
import { debounceTime, skip, switchMap, takeUntil } from 'rxjs/operators';

export class RxJSUtils {

  /**
   * Debounce the fullfillment of the requestFunction and cancel the fullfillment of the previously starteted requestFunction.
   *
   * @param debounceTime
   * @param requestFunction e.g. Observable for backend request
   */
  public static debounceAndSkipPrevious = (time: number, requestFunction: (...args: any) => Observable<any>) => (source$: Observable<any>) =>
    source$.pipe(
      debounceTime(time),
      switchMap((...args: any[]) =>
        requestFunction(...args)
          .pipe(
            takeUntil(
              source$
                .pipe(skip(1)
                )
            )
          )
      )
    );
}

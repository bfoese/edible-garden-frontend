import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';

/**
 * This guard must ONLY be used for the route that will be called from the
 * backend to indicate that the third party signin process finished. The sole
 * purpose of this guard is to inform the source window which startet the third
 * party signin process, that the signin process terminated.
 */
@Injectable({
  providedIn: 'root'
})
export class EgAuthBackendFeedbackGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

      console.log('backend feedback guard', _route.params, _route.paramMap, _route.queryParamMap, _route.queryParams);

    return true;
  }
}

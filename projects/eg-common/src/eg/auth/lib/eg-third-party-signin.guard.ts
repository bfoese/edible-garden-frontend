import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

import { Observable } from 'rxjs';

import { EgThirdPartySigninWindowMsg } from './eg-third-party-signin-window-msg';
import { EgThirdPartySigninConstants } from './eg-third-party-signin.constants';

/**
 * This guard must ONLY be used for the route that will be called from the
 * backend to indicate that the third party signin process finished. The sole
 * purpose of this guard is to inform the source window which startet the third
 * party signin process, that the signin process terminated.
 */
@Injectable({
  providedIn: 'root'
})
export class EgThirdPartySigninGuard implements CanActivate {
  constructor() {}
  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const tokenParam = 'token';
    const token = route.queryParamMap.has(tokenParam)
      ? route.queryParamMap.get(tokenParam)
      : undefined;

    // When window.opener is set, the current window was opened by another
    // window and the current window is probaly the third party signin consent
    // window.
    if (window.opener) {
      // inform the opener of the consent window that the signin process is finished
      const msg = {
        key: EgThirdPartySigninConstants.WINDOW_MSG_ThirdPartySignin_Finished,
        token: token ?? undefined
      } as EgThirdPartySigninWindowMsg;
      window.opener.postMessage(msg);
    }
    return true;
  }
}

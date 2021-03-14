import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import {
  SeedSharingAccountDto,
  SeedSharingAccountService
} from '@eg/edible-garden-api/src/public-api';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountSettingsResolver implements Resolve<SeedSharingAccountDto> {
  constructor(private seedSharingAccountService: SeedSharingAccountService) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<SeedSharingAccountDto>
    | Promise<SeedSharingAccountDto>
    | SeedSharingAccountDto {
    // must return a **completed** observable, otherwise the route will show a blank page
    return this.seedSharingAccountService.seedSharingAccountControllerGetSettings();
  }
}

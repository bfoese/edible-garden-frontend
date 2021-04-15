import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import {
  AccountSettingsResolverGQL,
  AccountSettingsResolverQuery,
  SeedSharingAccountDto
} from '@eg-seed/graphql-gen/eg-graphql';

import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountSettingsResolver
  implements Resolve<Partial<SeedSharingAccountDto>> {
  constructor(private accountSettingsGql: AccountSettingsResolverGQL, private apollo: Apollo) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ):
    | Observable<Partial<SeedSharingAccountDto>>
    | Promise<Partial<SeedSharingAccountDto>>
    | Partial<SeedSharingAccountDto> {
    // must return a **completed** observable, otherwise the route will show a blank page


    console.log('account settings resolver before gql request client', this.apollo.client);
    return this.accountSettingsGql
      .fetch()
      .pipe(
        tap((data) => console.log('fetched gql data', data)),
        map(
          (result: ApolloQueryResult<AccountSettingsResolverQuery>) =>
            result?.data?.accountSettings ?? undefined
        )
      );
  }
}

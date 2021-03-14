import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUserGuard } from '@eg-seed/core/auth/authenticated-user.guard';
import SeedNav from '@eg-seed/service/navigation/seed-nav.constants';
import { EgThirdPartySigninService } from '@eg/common/src/eg/auth';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'seed-social-signin-signup',
  templateUrl: './social-signin-signup.component.html',
  styleUrls: ['./social-signin-signup.component.scss']
})
export class SocialSigninSignupComponent implements OnDestroy {
  public readonly EgIconType = EgIconType;

  @Input()
  public isForSignup = false;

  private subscription$ = new Subscription();

  /** The user can call 'signin' explicitly or implicitly by clicking a link
   * that requires authentication. For implicit routes to signin page we want to
   * redirect the user to the page which was originally requested after signin
   * was successful. This field stores this URL which the user should be
   * redirected to after signin. */
  private redirectAfterLoginUrl: string | undefined;

  constructor(
    private thirdPartySigninService: EgThirdPartySigninService,
    private router: Router
  ) {
    // router.getCurrentNavigation() is only available in constructor, not later from other methods!
    this.redirectAfterLoginUrl = this.router.getCurrentNavigation()?.extras?.state?.[
      AuthenticatedUserGuard.NAV_EXTRA_REDIRECT_URL
    ];
  }

  public signinWithGoogle(): void {
    this.subscription$.add(
      this.thirdPartySigninService
        .signInWithGoogle()
        .subscribe((signinSuccess) => {
          if (signinSuccess) {
            if (this.redirectAfterLoginUrl) {
              void this.router.navigate([this.redirectAfterLoginUrl]);
            } else {
              void this.router.navigate([SeedNav.SeedSharing.full]);
            }
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}

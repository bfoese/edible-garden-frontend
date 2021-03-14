import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import SeedNav from '@eg-seed/service/navigation/seed-nav.constants';
import {
  EgAuthBackendFeedbackGuard,
  EgThirdPartySigninGuard
} from '@eg/common/src/eg/auth';

import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'third-party-signin',
        pathMatch: 'full',
        canActivate: [EgThirdPartySigninGuard]
      },
      {
        path: 'feedback',
        pathMatch: 'full',
        canActivate: [EgAuthBackendFeedbackGuard]
      },
      {
        path: ':state',
        component: AuthLandingComponent
      },

      {
        path: '',
        redirectTo:  SeedNav.SignIn.relative
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

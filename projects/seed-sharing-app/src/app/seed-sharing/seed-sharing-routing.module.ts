import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeedRouteData } from '@eg-seed/core/routing/seed-route-data.interface';
import { SeedRoutes } from '@eg-seed/core/routing/seed-route.interface';

import { AuthenticatedUserGuard } from '../core/auth/authenticated-user.guard';
import SeedNav from '../service/navigation/seed-nav.constants';
import { SeedSharingComponent } from './seed-sharing.component';

const routes: SeedRoutes = [
  {
    path: '',
    redirectTo: SeedNav.SeedSharing.relative
  },
  {
    path: SeedNav.SeedSharing.relative, // auxiliary routes must be children to a parent route with path not being ''!!!
    component: SeedSharingComponent,
    children: [
      {
        path: '',
        redirectTo: SeedNav.Map.relative
      },
      {
        path: SeedNav.Map.relative,
        loadChildren: () =>
          import('../feature/map/map/map.module').then((m) => m.MapModule)
      },
      {
        path: SeedNav.OfferCreate.relative,
        loadChildren: () =>
          import('../feature/offer/offer-editor/offer-editor.module').then(
            (m) => m.OfferEditorModule
          ),
        canActivate: [AuthenticatedUserGuard],
        data: {
          hideHeader: ['layout-portrait']
        } as SeedRouteData
      },
      {
        path: SeedNav.AccountSettings.relative,
        loadChildren: () =>
          import('../feature/account-settings/account-settings.module').then(
            (m) => m.AccountSettingsModule
          ),
        canActivate: [AuthenticatedUserGuard],
        data: {
          hideHeader: ['layout-portrait']
        } as SeedRouteData
      },
      {
        path: SeedNav.OfferPreview.relative,
        loadChildren: () =>
          import('../feature/offer/offer-preview/offer-preview.module').then(
            (m) => m.OfferPreviewModule
          ),
        outlet: 'secondary',
        canActivate: [AuthenticatedUserGuard],
        data: {
          hideHeader: ['layout-portrait']
        } as SeedRouteData
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeedSharingRoutingModule {}

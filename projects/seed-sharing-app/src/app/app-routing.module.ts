import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeedRoutes } from './core/routing/seed-route.interface';
import SeedNav from './service/navigation/seed-nav.constants';

const routes: SeedRoutes = [
  {
    path: '',
    loadChildren: () =>
      import('./seed-sharing/seed-sharing.module').then(
        (m) => m.SeedSharingModule
      )
  },
  {
    path: SeedNav.Authentication.relative,
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: SeedNav.SeedSharing.full
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false
      //onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

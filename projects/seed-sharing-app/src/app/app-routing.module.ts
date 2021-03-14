import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import SeedNav from './service/navigation/seed-nav.constants';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./seed-sharing/seed-sharing.module').then(
        (m) => m.SeedSharingModule
      ),
  },
  {
    path: SeedNav.Authentication.relative,
    loadChildren: () =>
      import('./feature/auth/auth.module').then((m) => m.AuthModule)
  },
  // {
  //   path: '**',
  //   redirectTo: SeedNav.SeedSharing.full
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      //onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

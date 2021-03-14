import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppNav } from './app-nav.enum';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: AppNav.GROWING_MANUAL_CATALOG },
  {
    path: AppNav.BOTANICAL_FAMILY_TREE,
    loadChildren: () =>
      import('./catalog/bot-family-tree/bot-family-tree.module').then(
        (m) => m.BotFamilyTreeModule
      )
  },
  {
    path: AppNav.GROWING_MANUAL_CATALOG,
    loadChildren: () =>
      import(
        './catalog/growing-manual-catalog/growing-manual-catalog.module'
      ).then((m) => m.GrowingManualCatalogModule)
  },
  {
    path: AppNav.SPECIES_SHEET,
    loadChildren: () =>
      import(
        './catalog/botanical-species-sheet/botanical-species-sheet.module'
      ).then((m) => m.BotanicalSpeciesSheetModule)
  },
  {
    path: AppNav.APP_SETTINGS,
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule)
  },
  {
    path: AppNav.APP_ABOUT,
    loadChildren: () =>
      import('./about/about.module').then((m) => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: AppNav.GROWING_MANUAL_CATALOG
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

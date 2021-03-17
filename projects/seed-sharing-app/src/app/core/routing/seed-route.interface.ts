import { Route } from '@angular/router';

import { SeedRouteData } from './seed-route-data.interface';

export type SeedRoutes = SeedRoute[];

export interface SeedRoute extends Route {
    data?: SeedRouteData;
}

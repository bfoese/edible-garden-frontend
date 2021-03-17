import { Data } from '@angular/router';

import { AppLayoutType } from '../ui/app-layout.type';

export interface SeedRouteData extends Data {
    i18nKeyTitle: string;
    hideHeader?: AppLayoutType[];
}

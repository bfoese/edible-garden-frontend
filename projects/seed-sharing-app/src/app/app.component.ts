import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  LOCALE_ID,
  OnInit
} from '@angular/core';
import { BREAKPOINT } from '@bfoese/eg-ui-models';
import { EgAuthFacadeService } from '@eg/common/src/eg/auth';
import { EnumUtils } from '@eg/common/src/lib/utils/enum/enum.utils';

import { combineLatest } from 'rxjs';

import { AuthenticatedUserGuard } from './core/auth/authenticated-user.guard';
import { ConfigurationService } from './core/configuration.service';
import { AppConfiguration } from './core/configuration/app-configuration.model';
import { BreakpointService } from './core/ui/breakpoint.service';
import { UrlResolver } from './core/url.resolver';

@Component({
  selector: 'seed-root',
  host: { id: 'eg-root' }, // id is set in index.html but gets lost
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') classBinding = '';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  private element: HTMLElement = this.elementRef.nativeElement;

  public constructor(
    private elementRef: ElementRef,
    private readonly configurationService: ConfigurationService,
    private readonly breakpointService: BreakpointService,
    public authenticatedUserGuard: AuthenticatedUserGuard,
    public authService: EgAuthFacadeService,
    private urlResolver: UrlResolver,
    @Inject(LOCALE_ID)
    private readonly localeId: string
  ) {}

  public ngOnInit(): void {
    this.urlResolver.resolve();

    combineLatest([
      this.configurationService.app$,
      this.breakpointService.active$
    ]).subscribe(([app, breakpoint]) => this.updateAppStyles(app, breakpoint));

    this.breakpointService.init(this.element);
    this.authService.refreshAuthToken().subscribe();
    this.addWebManifestLink();
  }

  private updateAppStyles(
    app: AppConfiguration,
    breakpoint: BREAKPOINT | null
  ): void {
    this.classBinding = [
      app.theme || '',
      this.getActiveBreakpointClasses(breakpoint)
    ].join(' ');
  }

  private getActiveBreakpointClasses(
    breakpoint: BREAKPOINT | null
  ): string | undefined {
    return breakpoint
      ? EnumUtils.getKeys(BREAKPOINT)
          .filter((key) => breakpoint >= BREAKPOINT[key])
          .reduce((previous, current) => `${previous} ${current}`.trim(), '')
      : undefined;
  }

  /**
   * Appends the link to the localized web manifest to the document <head> of
   * the application. This solution requires the app bundle to contain all
   * manifests of all locales (which I considered to be ok, since they aren't
   * large). <br/>An alternative solution would be, that the app bundle does not
   * include the manifest files but they would reside next to app bundles in the
   * Docker image and nginx could be configured to serve the right file. This
   * solution would require to adapt the Dockerfile and the nginx conf and the
   * logic for serving the manifest would be scatterd in three different places,
   * therefore I chose against it.<br/>
   *
   * However, the best solution would be that we could configure Angular build
   * architect to only include the manifest of the locale that is being bundled.
   * But I didn't found a way to accomplish that in the angular.json
   * configuration.
   */
  private addWebManifestLink(): void {
    document.head.innerHTML += `<link rel="manifest" href="manifests/manifest.${this.localeId}.json">`;
  }
}

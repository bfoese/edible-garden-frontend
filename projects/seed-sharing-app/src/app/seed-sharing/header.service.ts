import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { SeedRouteData } from '@eg-seed/core/routing/seed-route-data.interface';
import { AppLayoutService } from '@eg-seed/core/ui/app-layout.service';
import { AppLayoutType } from '@eg-seed/core/ui/app-layout.type';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';

type TreeNode = { children: TreeNode[]; value?: ActivatedRouteSnapshot };

@Injectable()
export class HeaderService {
  public readonly hideHeader$ = new BehaviorSubject<boolean>(false);

  constructor(
    private appLayoutService: AppLayoutService,
    private router: Router
  ) {
    combineLatest([
      this.appLayoutService.activeLayoutType$,
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
    ]).subscribe(([appLayoutType, _route]) => {
      const hideHeader = this.shouldHidHeader(appLayoutType ?? undefined);
      if (this.hideHeader$.getValue() !== hideHeader) {
        this.hideHeader$.next(hideHeader);
      }
    });
  }

  private shouldHidHeader(appLayoutType: AppLayoutType | undefined): boolean {
    return this.hasPrimaryOutletChildRequestToHideHeader(
      appLayoutType,
      // Cast to any necessary to access a private field: '_root' is a non
      // public field on the RouterState object. Running the method with the
      // public field 'root' instead will not give the same result!
      (this.router?.routerState as any)?._root,
      false
    );
  }

  /**
   * Traverses the route tree and checks all components in the primary outlet if
   * they require the header to be hidden for the given AppLayoutType.
   *
   * @param routerTreeNode - Root node of the current router tree.
   * @param isHideHeaderRequested - When called with root node, 'false' should
   * be provided as initial value
   * @returns When 'true', one component in the primary outlet requests the
   * header to be hidden for the given AppLayoutType. When 'false', none of the
   * components in the primary outlet requests the header to be hidden.
   */
  private hasPrimaryOutletChildRequestToHideHeader(
    appLayoutType: AppLayoutType | undefined,
    routerTreeNode: TreeNode,
    isHideHeaderRequested: boolean
  ): boolean {
    if (!appLayoutType || isHideHeaderRequested || !routerTreeNode) {
      return isHideHeaderRequested;
    }
    // We are only interested in primary router outlet. As far as I could tell,
    // there are no children contained for auxiliary routes anyway, but just to
    // be sure.
    if (routerTreeNode.value?.outlet === 'primary') {
      // Angular typing does not fit: 'data' should be of type 'Data' but is in
      // fact a  BehaviorSubject<Data> when logged to console
      const data = <BehaviorSubject<SeedRouteData>>routerTreeNode?.value?.data;

      // check if the SeedRouteData of that component forbids the header
      const hideHeaderConfig = data && data.getValue()?.hideHeader;
      if (hideHeaderConfig && hideHeaderConfig.includes(appLayoutType)) {
        return true;
      }
    }

    if (routerTreeNode.children) {
      for (let i = 0; i < routerTreeNode.children.length; i++) {
        const child: TreeNode = routerTreeNode.children[i];
        return this.hasPrimaryOutletChildRequestToHideHeader(
          appLayoutType,
          child,
          isHideHeaderRequested
        );
      }
    }
    return isHideHeaderRequested;
  }
}

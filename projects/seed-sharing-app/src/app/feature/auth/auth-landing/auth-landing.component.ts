import {
  AfterViewInit,
  ChangeDetectorRef,
  Compiler,
  Component,
  ComponentFactory,
  ComponentRef,
  Inject,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SeedNav, { NavAuthRelChildPaths } from '@eg-seed/service/navigation/seed-nav.constants';
import { EG_PRODUCT, EgProduct } from '@eg/common/src/eg/injectors/eg-product';
import { LazyComponentLoader } from '@eg/common/src/lib/ng/factory/lazy-component-loader';

import { EgIconType } from 'projects/eg-ui-dynamic-icons/src/public-api';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePasswordModule } from '../change-password/change-password.module';
import { RequestAccountActionTokenType } from '../request-account-action-token/request-account-action-token-type.enum';
import { RequestAccountActionTokenComponent } from '../request-account-action-token/request-account-action-token.component';
import { RequestAccountActionTokenModule } from '../request-account-action-token/request-account-action-token.module';
import { SignInComponent } from '../signin/signin.component';
import { SignInModule } from '../signin/signin.module';
import { SignUpComponent } from '../signup/signup.component';
import { SignUpModule } from '../signup/signup.module';

/**
 * The Auth Component uses an animation when switching between signin and
 * signup. First approach was to use Angular route transitions for this, but the
 * behavior was odd and hard to debug. Benefit of route animations would have
 * been that you can use your lazy loaded modules the normal way and it saves
 * you the code of loading, attaching, detaching and destroying the components.
 *
 * However, this is an example of an alternative approach: The Auth component
 * provides a nice animation when switching between two states. For each of
 * these states there is a ViewChild that provides a slot to lazy load a
 * component into it.
 *
 * There are two routes defined for Auth component: one with a path parameter
 * which can be used to open the component with the desired state (signin,
 * signup). And one route without path parameter. For this route, the auth
 * component will initialize itself in state 'signin'.
 *
 * Depending on which state is currently active, the appropriate component will
 * be lazy loaded into the Auth component. This way we have the benefits of lazy
 * loading and separate routes for each state and no relevant disadvantages when
 * compared to lazy loaded modules with route animation.
 *
 * Auth component will check, if the desired lazy component was already loaded
 * before, because I decided to resuse the components when switching between
 * states. The lazy components need to be loaded only once.
 *
 * Technically, one slot for the lazy components would be sufficient, cause the
 * components can be deattached and reattached by code, but then it would be
 * harder or maybe impossible to have the animation this way where the old
 * component is still visible, while the new component will be loaded into its
 * slot.
 *
 * In the end the auth component evolved and not it is also used to show the
 * "forgot password" and the "request verify email notification" screens. The
 * general idea is to have the signup component always on the left screen side
 * and it will always be the only component in that lazy component slot. While
 * the lazy component slot on the right side of the screen is being used to host
 * alternating different components (Signup, RequestAccountActionToken). So the
 * logic for one of the lazy component containers includes attaching, detaching
 * and reataching of lazy loaded or previously cached components.
 */
@Component({
  selector: 'seed-auth-landing',
  templateUrl: './auth-landing.component.html',
  styleUrls: ['./auth-landing.component.scss']
})
export class AuthLandingComponent implements AfterViewInit, OnDestroy {
  private subscription$ = new Subscription();

  public readonly focusSignin$ = new BehaviorSubject<boolean>(false);
  public currentState!: NavAuthRelChildPaths;

  @ViewChild('lazyChildOne', { read: ViewContainerRef })
  private containerLazyChildOne!: ViewContainerRef;

  @ViewChild('lazyChildTwo', { read: ViewContainerRef })
  private containerLazyChildTwo!: ViewContainerRef;

  /**
   *
   */
  private lazyLoadedComponentsCache: Array<ComponentRef<any>> = [];

  /**
   * We need a small workaround. Changing the ngAfterViewInit logic threw an
   * 'ExpressionChangedAfterItHasBeenCheckedError' because it issued a
   * HostBinding change in the DualPaneLayout component. So on the very first
   * cycle of loading the lazy component, we need to enforce a changeDetection
   * cycle. This variable is used to keep track of wether this is our inital
   * view setup or not. When 'true' a changeDetection must be triggered at the
   * end of ngAfterViewInit.
   */
  private isInitialViewInit = true;

  public SeedNav = SeedNav;

  public EgIconType = EgIconType;

  constructor(
    private route: ActivatedRoute,
    private compiler: Compiler,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    @Inject(EG_PRODUCT) public readonly egProduct: EgProduct
  ) {}

  public ngAfterViewInit(): void {
    this.subscription$.add(
      this.route.params.subscribe((params) => {
        const state = params['state'] ?? 'signin'; // default state if nothing provided is signin
        this.setAuthState(state);

        if (this.isInitialViewInit) {
          this.changeDetector.detectChanges();
          this.isInitialViewInit = false;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.lazyLoadedComponentsCache?.forEach((cachedComponent) =>
      cachedComponent?.destroy()
    );
  }

  private setAuthState(state: NavAuthRelChildPaths): void {
    this.currentState = state;

    if (state === 'signup') {
      this.addComponent<SignUpComponent>(
        this.containerLazyChildTwo,
        SignUpComponent,
        this.getSignupComponentLoader(),
        () => {}
      );

      this.focusSignin$.next(false);
      return;

      } else  if (state === 'change-password') {
      this.addComponent<ChangePasswordComponent>(
        this.containerLazyChildTwo,
        ChangePasswordComponent,
        this.getChangePasswordComponentLoader(),
        () => {}
      );
      this.focusSignin$.next(false);
        return;
    } else if (this.mapRouteToAccountActionType(state) !== undefined) {
      this.addComponent<RequestAccountActionTokenComponent>(
        this.containerLazyChildTwo,
        RequestAccountActionTokenComponent,
        this.getRequestAccountActionTokenComponentLoader(),
        (componentRef: ComponentRef<RequestAccountActionTokenComponent>) => {
          const actionType = this.mapRouteToAccountActionType(state);
          if (actionType) {
            componentRef.instance.routeParameterAction = actionType;
          }
        }
      );
      this.focusSignin$.next(false);
      return;
    }

    // if nothing matches, we route to signin
    this.loadAndAttachSigninComponent();
    this.focusSignin$.next(true);
  }

  private mapRouteToAccountActionType(
    path: NavAuthRelChildPaths
  ): RequestAccountActionTokenType | undefined {
    if (path) {
      switch (path) {
        case 'request-reset-password':
          return RequestAccountActionTokenType.ResetPassword;
        case 'verify-email':
          return RequestAccountActionTokenType.VerifyEmail;
      }
    }
    return undefined;
  }

  /**
   * This method will attach a given component to the given container.
   * IMPORTANT: This method assumes that the container is supposed to contain
   * only one component at a time. So before attaching a new component, this
   * method will detach the already attached component, if one is present.
   *
   * Also, this method is using the array of cached components minimize the
   * re-loading of components that have been used before.
   *
   * @param container - This container is being used as a sink to attach the
   * given component.
   * @param componentClass - Class of the component that is supposed to be
   * attached to the container. This will be used to check if we already have
   * this component created and cached before. In case we have the given
   * component class cached, we will reuse it.
   * @param resolver - If no cached component of the given class was found, this
   * will be the resolver that is being used to create this component from
   * scratch.
   * @param prepareComponent - Here you get access to the component that is
   * about to be attached to the container. You can call functions of the
   * component to initalize its state.
   */
  private addComponent<T>(
    container: ViewContainerRef,
    componentClass: Type<any>,
    componentFactoryLoader: Promise<ComponentFactory<T> | undefined>,
    prepareComponent: (component: ComponentRef<T>) => void
  ): void {
    // Find the component
    const cachedComponent = this.lazyLoadedComponentsCache.find(
      (component) => component.instance instanceof componentClass
    );

    if (cachedComponent) {
      prepareComponent(cachedComponent);
      // Remove component from both view and array

      if (container.length === 0) {
        container.insert(cachedComponent?.hostView!, 0);
      } else {
        const currentComponent = container.get(0);

        if (currentComponent === cachedComponent?.hostView) {
          return; // the component is already attached
        } else {
          // detach allows reusing the component, but we have to destroy it
          // manually. when using remove instead, the component will be
          // destroyed automatically
          container.detach(0);
          container.insert(cachedComponent?.hostView!, 0);
        }
      }
    } else if (componentFactoryLoader) {
      componentFactoryLoader.then((componentFactory) => {
        if (componentFactory && componentFactory instanceof ComponentFactory) {
          if (container.length !== 0) {
            container.detach(0);
          }
          const newComponent = container.createComponent(componentFactory, 0);
          prepareComponent(newComponent);
          this.lazyLoadedComponentsCache.push(newComponent);
        }
      });
    }
  }

  private getSignupComponentLoader(): Promise<
    ComponentFactory<SignUpComponent> | undefined
  > {
    return LazyComponentLoader.lazyLoadComponent<SignUpModule, SignUpComponent>(
      this.compiler,
      this.containerLazyChildTwo,
      import('./../signup/signup.module'),
      (module) =>
        (<typeof import('./../signup/signup.module')>module).SignUpModule,
      import('./../signup/signup.component'),
      (module) =>
        (<typeof import('./../signup/signup.component')>module).SignUpComponent
    );
  }

  private getChangePasswordComponentLoader(): Promise<
    ComponentFactory<ChangePasswordComponent> | undefined
  > {
    return LazyComponentLoader.lazyLoadComponent<ChangePasswordModule, ChangePasswordComponent>(
      this.compiler,
      this.containerLazyChildTwo,
      import('./../change-password/change-password.module'),
      (module) =>
        (<typeof import('./../change-password/change-password.module')>module).ChangePasswordModule,
      import('./../change-password/change-password.component'),
      (module) =>
        (<typeof import('./../change-password/change-password.component')>module).ChangePasswordComponent
    );
  }

  private loadAndAttachSigninComponent() {
    const cachedComponent = this.lazyLoadedComponentsCache.find(
      (component) => component.instance instanceof SignInComponent
    );

    if (cachedComponent) {
      return;
    }

    LazyComponentLoader.lazyLoadComponent<SignInModule, SignInComponent>(
      this.compiler,
      this.containerLazyChildOne,
      import('./../signin/signin.module'),
      (module) =>
        (<typeof import('./../signin/signin.module')>module).SignInModule,
      import('./../signin/signin.component'),
      (module) =>
        (<typeof import('./../signin/signin.component')>module).SignInComponent
    ).then((factory) => {
      if (factory) {
        this.lazyLoadedComponentsCache.push(
          this.containerLazyChildOne.createComponent(factory, 0)
        );
      }
    });
  }

  private getRequestAccountActionTokenComponentLoader(): Promise<
    ComponentFactory<RequestAccountActionTokenComponent> | undefined
  > {
    return LazyComponentLoader.lazyLoadComponent<
      RequestAccountActionTokenModule,
      RequestAccountActionTokenComponent
    >(
      this.compiler,
      this.containerLazyChildTwo,
      import(
        './../request-account-action-token/request-account-action-token.module'
      ),
      (module) =>
        (<
          typeof import('./../request-account-action-token/request-account-action-token.module')
        >module).RequestAccountActionTokenModule,
      import(
        './../request-account-action-token/request-account-action-token.component'
      ),
      (module) =>
        (<
          typeof import('./../request-account-action-token/request-account-action-token.component')
        >module).RequestAccountActionTokenComponent
    );
  }

  public onSignup(): void {
    // TODO maybe prevent the switch to appear in BrowserBackHistory?
    this.router.navigate([SeedNav.SignUp.full]);
  }

  public onSignin(): void {
    // TODO maybe prevent the switch to appear in BrowserBackHistory?
    this.router.navigate([SeedNav.SignIn.full]);
  }
}

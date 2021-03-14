import {
  Compiler,
  ComponentFactory,
  Type,
  ViewContainerRef
} from '@angular/core';

export class LazyComponentLoader {
  /**
   * This approach makes sure, that the Component is instantiated via its module
   * and not via the root module. This is necessary to have the dependencies of
   * the lazy components module resolved.
   * https://github.com/angular/angular/issues/35759#issuecomment-601444856.
   *
   * This lazy loading technique will create a new instance of the lazy
   * components module each time, which may not be desirable. Consider caching
   * the ngModule somewhere (or even just factory in this case) but keep in mind
   * that this instance is specific to a parent Injector, which is the injector
   * of the provided lazyComponentContainer
   *
   * Disclaimer: Use this with caution. See the last paragraph. At this point I
   * am not sure when reusing the compiled module/moduleFactory would be
   * recommended and when not. The module is created with the injector of the
   * provided lazyComponentContainer. If I have two different containers within
   * a parent component, one for showing Component A and one for Component B and
   * both components belong to the same module, would it be ok to cache the
   * module when created for Component A and its container injector and then
   * reuse if for creating Component B, even though Component B will be in a
   * different container and the injector might be different? The impact of the
   * injector is not clear to me. In doubt, I would prefer creating the module
   * twice as long as it does not need to be a singleton.
   *
   * @param compiler - Compiler can be injected into parent component via
   * constructor
   * @param lazyComponentContainer - Container which should host the lazy
   * component
   * @param modulePath - Path of the lazy components module for import. Be aware that
   * @param resolveModule - Result of the module import: you need to return the
   * module instance type
   * @param componentPath - Path of the lazy component to load
   * @param resolveComponent - Result of the component import: you need to
   * return the component instance type
   */
  public static lazyLoadComponent<M, C>(
    compiler: Compiler,
    lazyComponentContainer: ViewContainerRef,
    moduleImport: Promise<unknown>,
    resolveModule: (moduleImport: unknown) => Type<M>,
    componentImport: Promise<unknown>,
    resolveComponent: (componentImport: unknown) => Type<C>
  ): Promise<ComponentFactory<C> | undefined> {

    if (!moduleImport || !componentImport || !compiler || !lazyComponentContainer || !resolveModule || !resolveComponent) {
      return Promise.reject('Missing parameter');
    }
    // Don’t use async/await when you compile to es2017. Zone js can not patch
    // native async/await statements. Therefore you might run into trouble with
    // Change Detection.
    return Promise.all([moduleImport, componentImport])
      .then((values) => {
        const module = values[0];
        const component = values[1];

        if (module && component) {
          const ngModuleFactory = compiler.compileModuleSync(
            resolveModule(module)
          );
          const ngModule = ngModuleFactory.create(
            lazyComponentContainer.injector
          );
          const componentFactory = ngModule.componentFactoryResolver.resolveComponentFactory(
            resolveComponent(component)
          );
          return componentFactory;
        }
        return undefined;
      })
      .catch((error) => {
        console.error(
          '[LazyComponentLoader] Failed to create lazy component resolver',
          error
        );
        return undefined;
      });
  }
}

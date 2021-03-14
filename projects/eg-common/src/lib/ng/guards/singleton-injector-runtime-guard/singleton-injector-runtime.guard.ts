/**
 * This class is a helper to prevent dynamic instantiation of multiple instances
 * of a service or module which are intended to be a singleton service/module by
 * throwing a runtime error. Angular provides different ways of creating a
 * singleton service/module and neither of them strongly prevent that this
 * supposed to be singleton service/module is being instantiated multiple times,
 * for example by mistakenly adding the service to a 'providers' declaration of
 * a module.
 */
export class SingletonInjectorRuntimeGuard {
  /**
   * Calling the guard will throw a runtime error as soon as a second instance of
   * the same service/module will be instantiated. This might happen when loading
   * new modules dynamically during application usage, so you must not expect the
   * error to be thrown right after application startup.
   *
   * Example Usage:
   *
   * <pre>
   * class SingletonServiceOrModule {
   *     constructor(@Optional() @SkipSelf() parent?: SingletonServiceOrModule) {
   *         SingletonInjectorGuard.guardSingletonInjector(parent);
   *     }
   * }
   * </pre>
   * @param parent -
   */
  public static guardSingletonInjector<T extends { constructor: unknown }>(
    parent?: T
  ): void {
    if (parent) {
      throw Error(
        `[SingletonInjectorRuntimeGuard]: Trying to create multiple instances of ${
          this.getClassName(parent) ?? '<unknown>'
        } - this injector is intended to be a singleton within the application. If the class is a module make sure to only import it within the root application module. If the class is a service, here are suggestions of how to handle singleton services: https://stackoverflow.com/a/54201050.`
      );
    }
  }

  /**
   * Extract the class name from the given object
   * @param parent - constains a 'constructor' field, so is probably a class
   */
  private static getClassName<T extends { constructor: unknown }>(
    parent?: T
  ): string | undefined {
    if (!parent) {
      return undefined;
    }
    // classDefinition will contain the complete source code of the parent
    // object as string (without imports)
    const classDefinition: string = parent.constructor + '';
    if (classDefinition) {
      // we are interested in the name of the class: the substring before the
      // first curly bracket will contain the classname
      return classDefinition.substr(0, classDefinition.indexOf('{'));
    }
    return undefined;
  }
}

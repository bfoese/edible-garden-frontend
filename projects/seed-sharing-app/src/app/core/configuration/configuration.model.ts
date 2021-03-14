export abstract class Configuration<C> {
  public update<T>(config: Partial<T>): void {
    const properties = Object.keys(config);
    for (const key of properties) {
      (this as any)[key] = (config as any)[key];
    }
  }

  public abstract copy(): C;
}

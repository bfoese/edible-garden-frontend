export class NavUtil {
  public static relativeToParent(relativePath: string): string {
    return `../${relativePath}`;
  }
}

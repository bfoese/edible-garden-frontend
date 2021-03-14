export class StringUtils {
  public static compare(a: string, b: string): number {
    if (!a && b) {
      return 1;
    }
    if (a && !b) {
      return -1;
    }
    if (!a && !b) {
      return 0;
    }
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  public static isEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
  }

  public static isNotEmpty(str: string | null | undefined): boolean {
    return !this.isEmpty(str);
  }

  public static compareIgnoreCase(a: string, b: string): number {
    if (!a && b) {
      return 1;
    }
    if (a && !b) {
      return -1;
    }
    if (!a && !b) {
      return 0;
    }
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  public static equalsIgnoreCase(a: string, b: string): boolean {
    return this.compareIgnoreCase(a, b) === 0;
  }

  public static equals(a: string, b: string): boolean {
    return this.compare(a, b) === 0;
  }

  public static someContains(
    a: Array<string | undefined>,
    searchString: string,
    ignoreCase: boolean
  ): boolean {
    if (!a) {
      return false;
    }
    return a.some((str) => this.contains(str, searchString, ignoreCase));
  }

  public static contains(
    a: string | undefined,
    searchString: string,
    ignoreCase: boolean
  ): boolean {
    if (this.isEmpty(a) || this.isEmpty(searchString)) {
      return false;
    }

    const aNormalized = ignoreCase ? a!.toLowerCase() : a!;
    const substringNormalized = ignoreCase
      ? searchString.toLowerCase()
      : searchString;

    return aNormalized.indexOf(substringNormalized) !== -1;
  }
}

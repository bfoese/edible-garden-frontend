export class ArrayUtils {
  public static isEmpty<T>(a: T[] | null | undefined): boolean {
    return !a || a.length === 0;
  }

  public static isNotEmpty<T>(a: T[] | null | undefined): boolean {
    return !this.isEmpty(a);
  }

  public static contains<T>(a: T[] | null | undefined, elem: T): boolean {
    return a ? a.some((contained: T) => contained === elem) : false;
  }

  /**
   * Pushes an element to the end of an array if not already contained somewhere
   * in this array. Returns the modified or the original array.
   *
   * @param a - Array to be appended
   * @param elem - Element to be pushed into the array
   */
  public static pushDistinct<T>(a: T[] | null | undefined, elem: T): T[] {
    a = a ?? [];
    if (a && elem && !this.contains(a, elem)) {
      a.push(elem);
    }
    return a;
  }

  /**
   * Removes duplicate entries from the array
   *
   * @param a - Array to be filtered
   */
  public static filterDistinct<T>(a: T[] | null | undefined): T[] {
    a = a ?? [];
    const distinctFilter = (value: T, index: number, self: T[]) => {
      return self.indexOf(value) === index;
    };
    return a.filter(distinctFilter);
  }
}

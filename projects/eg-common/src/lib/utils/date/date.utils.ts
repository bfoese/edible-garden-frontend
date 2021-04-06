export class DateUtils {

  /**
   * @param date
   * @returns Date in string format YYYY-MM-DD
   */
  public static toISODateString(date: Date): string | undefined {
    return date ? date.toISOString().substring(0, 10) : undefined;
  }
}

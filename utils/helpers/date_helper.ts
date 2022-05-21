import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { DateType } from "../../types";

export class DateUtils {
  public static standardDateFormat: string = "MMM D, YYYY";

  public static toDate(date: DateType): Dayjs {
    return dayjs(date);
  }

  public static formatDate(
    date: DateType,
    format: string = this.standardDateFormat
  ): string {
    const dated: Dayjs = this.toDate(date);

    return dated.format(format);
  }
}

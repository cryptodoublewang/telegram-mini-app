import {
  intervalToDuration,
  // formatDuration,
} from "date-fns";
import moment, { Moment } from "moment";
import { SupportLocales } from "../../i18n";
import AppHelper from "./AppHelper";
import { getTimenow } from "../../apis/user";

export class BEDateTimeObject {
  currentGlobalMoment: Moment;
  type: "local" | "api" | "count up";
  // interval: NodeJS.Timeout | undefined;
  /**
   * constructor, this class is use to fetch remote date time (ignore device datetime)
   * @param intervalMilis interval betwwen each reload time
   * @param intervalWithApi use BE Time Api to update time between interval
   */
  constructor(intervalMilis: number = 200, intervalWithApi: boolean = false) {
    //FIXME: moment() might make the time gone wrong for a while
    this.currentGlobalMoment = moment();
    this.type = "local";
    getTimenow().then((dt) => {
      this.currentGlobalMoment = moment(dt?.currentTime);
      this.type = "api";

      if (intervalMilis) {
        //Use react native animated timer since it more stable than setInterval
        AppHelper.AnimatedInterval(async () => {
          this.type = "count up";

          try {
            if (intervalWithApi) {
              const globalDateTime = await getTimenow();
              this.currentGlobalMoment = moment(globalDateTime?.currentTime);
            } else {
              this.currentGlobalMoment = this.currentGlobalMoment.add(
                intervalMilis,
                "milliseconds"
              );
            }
          } catch (e) {}
        }, intervalMilis);
      }
    });
  }

  [Symbol.dispose]() {
    // clearInterval(this.interval);
    // this.interval = undefined;
  }
}

export default class DateTimeHelper {
  static globalTime = new BEDateTimeObject();
  static formatDuration_dhms = (start: number, end: number): string => {
    const duration = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    });
    return `${
      duration.days ? duration?.days + ":" : ""
    }${DateTimeHelper._formatTimeItem(
      duration?.hours
    )}:${DateTimeHelper._formatTimeItem(
      duration?.minutes
    )}:${DateTimeHelper._formatTimeItem(duration?.seconds)}`;
  };

  //Not used
  static formatDuration_dhm = (start: number, end: number): string => {
    const duration = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    });
    return `${
      duration.days ? duration?.days + ":" : ""
    }${DateTimeHelper._formatTimeItem(
      duration?.hours
    )}:${DateTimeHelper._formatTimeItem(duration?.minutes)}`;
  };

  static getMoment = (
    inp?: moment.MomentInput,
    strict?: boolean | undefined,
    locale: SupportLocales = "en"
  ): Moment => {
    if (locale) {
      moment.locale(locale);
    }

    return moment(inp, strict);
  };
  static getCurrentMoment = (
    locale: SupportLocales = "en",
    useBETime: boolean = true
  ): Moment => {
    if (locale) {
      moment.locale(locale);
    }

    return useBETime
      ? moment(DateTimeHelper.globalTime.currentGlobalMoment)
      : moment();
  };

  static getUTCMoment = (
    inp?: moment.MomentInput,
    strict?: boolean | undefined,
    locale?: SupportLocales
  ): Moment => {
    if (locale) {
      moment.locale(locale);
    }
    const dd = moment(inp, strict).toDate();

    const a = dd.getUTCFullYear();
    const b = dd.getUTCMonth();
    const c = dd.getUTCDate();

    const d = new Date();
    const e = d.getUTCHours();
    const f = d.getUTCMinutes();
    const g = d.getUTCSeconds();

    return moment(new Date(a, b, c, e, f, g));
  };

  static _formatTimeItem(item?: number) {
    if (!item) {
      return "00";
    }
    return item < 10 ? `0${item}` : `${item}`;
  }
}

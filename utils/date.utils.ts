
export class DateUtils {

    public static weekdaysShort = new Map([
        [0, 'So'],
        [1, 'Mo'],
        [2, 'Di'],
        [3, 'Mi'],
        [4, 'Do'],
        [5, 'Fr'],
        [6, 'Sa'],
    ]);

    public static weekdays = new Map([
        [0, 'Sonntag'],
        [1, 'Montag'],
        [2, 'Dienstag'],
        [3, 'Mittwoch'],
        [4, 'Donnerstag'],
        [5, 'Freitag'],
        [6, 'Samstag'],
    ]);

    /**
     * Checks if date2 is greather than date 1
     */
    public static gt(date1: Date, date2: Date) {
        if (!date1 || !date2) {
            return false;
        }
        return date1.getTime() < date2.getTime();
    }


    /**
     * Checks if date2 is greather than or equal to date 1
     */
    public static gte(date1: Date, date2: Date) {
        if (!date1 || !date2) {
            return false;
        }
        return date1.getTime() <= date2.getTime();
    }

    /**
     * Checks if date2 is less than date 1
     */
    public static lt(date1: Date, date2: Date) {
        if (!date1 || !date2) {
            return false;
        }
        return date1.getTime() > date2.getTime();
    }

    /**
     * Checks if date2 is less than or equal to date 1
     */
    public static lte(date1: Date, date2: Date) {
        if (!date1 || !date2) {
            return false;
        }
        return date1.getTime() >= date2.getTime();
    }

    public static isSameDay(date1: Date, date2: Date) {
        if (!date1 || !date2) {
            return false;
        }
        const dayEquals = +date1.getDate() == +date2.getDate();
        const monthEquals = +date1.getMonth() == +date2.getMonth();
        const yearEquals = +date1.getFullYear() == +date2.getFullYear();
        return dayEquals && monthEquals && yearEquals;
    }

    public static isTomorrow(date1: Date) {
        if (!date1) {
            return false;
        }
        const now = new Date();
        return this.isSameDay(date1, this.addDays(now, 1) as Date);
    }

    public static isYesterday(date1: Date) {
        if (!date1) {
            return false;
        }
        const now = new Date();
        return this.isSameDay(date1, this.addDays(now, -1) as Date);
    }

    public static isToday(date1: Date) {
        if (!date1) {
            return false;
        }
        const now = new Date();
        return this.isSameDay(date1, now);
    }

    public static addMinutes(date: Date, minutes: number) {
        if ((!date || !minutes) && minutes !== 0) {
            return undefined;
        }
        const newDate = new Date(date);
        newDate.setMinutes(+newDate.getMinutes() + minutes);
        return newDate;
    }

    public static addDays(date: Date, days: number) {
        if ((!date || !days) && days !== 0) {
            return undefined;
        }
        const newDate = new Date(date);
        newDate.setDate(+newDate.getDate() + days);
        return newDate;
    }

    public static addHours(date: Date, hours: number) {
        if ((!date || !hours) && hours !== 0) {
            return undefined;
        }
        const newDate = new Date(date);
        newDate.setHours(+newDate.getHours() + hours);
        return newDate;
    }

    public static addMonths(date: Date, months: number) {
        if ((!date || !months) && months !== 0) {
            return undefined;
        }
        const newDate = new Date(date);
        newDate.setMonth(+newDate.getMonth() + months);
        return newDate;
    }

    public static getMidnight(date: Date) {
        if (!date) {
            return undefined;
        }
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }

    public static getEndOfDay(date: Date) {
        if (!date) {
            return undefined;
        }
        const midnight = this.getMidnight(date) as Date;
        const nextDate = this.addDays(midnight, 1) as Date;
        return this.addMinutes(nextDate, -1);
    }


    public static toDateString(date: Date) {
        if (!date) {
            return undefined;
        }
        return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    }

    /** Used if date-time input field is used */
    public static parseDateString(date: string) {
        if (!date) {
            return undefined;
        }
        date = date.replace('T', '-');
        const parts = date.split('-');
        const timeParts = parts[3].split(':');

        // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
        return new Date(+parts[0], +parts[1] - 1, +parts[2], +timeParts[0], +timeParts[1]);     // Note: months are 0-based
    }

    public static toDateInputString(date: Date) {
        if (!date) {
            return undefined;
        }
        return date.getFullYear().toString() + '-'
            + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
            + ("0" + (date.getDate())).slice(-2);
    }

    public static parseDateFromDateInput(value: string) {
        if (!value) {
            return undefined;
        }
        const parts = value.split('-');
        return new Date(+parts[0], +parts[1] - 1, +parts[2], 0, 0, 0, 0);     // Note: months are 0-based
    }

    public static toTimeInputString(date: Date) {
        if (!date) {
            return undefined;
        }
        return ("0" + (date.getHours())).slice(-2) + ':'
            + ("0" + (date.getMinutes())).slice(-2);
    }

    public static parseDateFromTimeInput(value: string) {
        if (!value) {
            return undefined;
        }
        const parts = value.split(':');
        const now = new Date();
        now.setHours(+parts[0])
        now.setMinutes(+parts[1]);
        now.setSeconds(0);
        now.setMilliseconds(0);
        return now;
    }

    public static getCurrentDifferenceToUTC() {
        const date = new Date();
        return date.getHours() - date.getUTCHours();
    }
}

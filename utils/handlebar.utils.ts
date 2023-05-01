import { DateUtils } from "./date.utils";

export const helpers = {
    if_eq: function (a: any, b: any, opts: any) {
        if (a === b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    date_input: function (a: Date, opts: any) {
        return DateUtils.toDateInputString(a);
    },
    date: function (a: Date, opts: any) {
        return DateUtils.toDateString(a);
    },
    neg: function (a: boolean, opts: any) {
        return !a;
    }
}

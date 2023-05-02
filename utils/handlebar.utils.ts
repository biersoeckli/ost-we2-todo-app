import { DateUtils } from "./date.utils";

export const helpers = {
    if_eq: (a: any, b: any, opts: any) => {
        if (a === b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },
    date_input: (a: Date) => {
        return DateUtils.toDateInputString(a);
    },
    date: (a: Date) => {
        return DateUtils.toDateString(a);
    },
    evalArrow: (a: string, b: string, c: boolean) => {
        if (a === b) {
            if (c) {
                return '⬆'
            }
            return '⬇'
        }
        return '';
    },
    neg: (a: boolean) => {
        if (a === undefined || a === null) {
            return undefined;
        }
        return !a;
    },
    threeStateSwitch: (a: boolean | string) => {
        if (a === true + '') {
            return '';
        }
        if (a === '' || a === undefined || a === null) {
            return false;
        }
        if (a === false + '') {
            return true;
        }

    },
    getItemOfList: (list: any[], index: number) => {
        return list[index];
    },
    notUndefined: (a: any) => {
        return a !== undefined && a !== null;
    },
    sunOrMoon: (a: boolean) => {
        return a ? '🌙' : '🌞';
    },
    showCheckbox: (a: boolean) => {
        return a ? '☑️' : '❌';
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Helpers.
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;
function msFn(value, options) {
    try {
        if (typeof value === 'string' && value.length > 0) {
            return parse(value);
        }
        else if (typeof value === 'number' && isFinite(value)) {
            return options?.long ? fmtLong(value) : fmtShort(value);
        }
        throw new Error('Value is not a string or number.');
    }
    catch (error) {
        const message = isError(error)
            ? `${error.message}. value=${JSON.stringify(value)}`
            : 'An unknown error has occurred.';
        throw new Error(message);
    }
}
/**
 * Parse the given string and return milliseconds.
 *
 * @param str - A string to parse to milliseconds
 * @returns The parsed value in milliseconds, or `NaN` if the string can't be
 * parsed
 */
function parse(str) {
    if (str.length > 100) {
        throw new Error('Value exceeds the maximum length of 100 characters.');
    }
    const match = /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    // Named capture groups need to be manually typed today.
    // https://github.com/microsoft/TypeScript/issues/32098
    const groups = match?.groups;
    if (!groups) {
        return NaN;
    }
    const n = parseFloat(groups.value);
    const type = (groups.type || 'ms').toLowerCase();
    switch (type) {
        case 'anos':
        case 'ano':
        case 'a':
            return n * y;
        case 'semanas':
        case 'semana':
        case 'sem':
            return n * w;
        case 'dias':
        case 'dia':
        case 'd':
            return n * d;
        case 'horas':
        case 'hora':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutos':
        case 'minuto':
        case 'mins':
        case 'min':
            return n * m;
        case 'segundos':
        case 'segundo':
        case 'seg':
        case 's':
            return n * s;
        case 'milisegundos':
        case 'milisegundo':
        case 'ms':
            return n;
        default:
            // This should never occur.
            throw new Error(`The unit ${type} was matched, but no matching case exists.`);
    }
}
// eslint-disable-next-line import/no-default-export
exports.default = msFn;
/**
 * Short format for `ms`.
 */
function fmtShort(ms) {
    const msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return `${Math.round(ms / d)}d`;
    }
    if (msAbs >= h) {
        return `${Math.round(ms / h)}h`;
    }
    if (msAbs >= m) {
        return `${Math.round(ms / m)}m`;
    }
    if (msAbs >= s) {
        return `${Math.round(ms / s)}s`;
    }
    return `${ms}ms`;
}
/**
 * Long format for `ms`.
 */
function fmtLong(ms) {
    const msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'dia');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hora');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minuto');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'segundo');
    }
    return `${ms} ms`;
}
/**
 * Pluralization helper.
 */
function plural(ms, msAbs, n, name) {
    const isPlural = msAbs >= n * 1.5;
    return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`;
}
/**
 * A type guard for errors.
 *
 * @param value - The value to test
 * @returns A boolean `true` if the provided value is an Error-like object
 */
function isError(value) {
    return typeof value === 'object' && value !== null && 'message' in value;
}
module.exports = exports.default;
module.exports.default = exports.default;

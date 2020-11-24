/**
 * Function signature for checking equality
 *
 * @param {T} v1 - Value provided
 * @param {T} v2 - Value to be compared against
 * @returns {boolean}
 */
export interface EqualsFunction<T> {
    (v1: T, v2: T): boolean
}

/**
 * Default function to test equality.
 *
 * @private
 * @param {T} v1 - Value provided
 * @param {T} v2 - Value to be compared against
 * @returns {boolean}
 */
export const defaultEquals = <T>(v1: T, v2: T): boolean => v1 === v2

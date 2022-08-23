import PolyTypes from "./PolyTypes.js";

/** @file src/PolySchema.js */

/**
 * PolySchema class for defining & validating information
 * @class
 * @example
 * const schema = new PolySchema({
 *     _id: PolyTypes.string
 * })
 */
class PolySchema {
    /**
     * create a new PolySchema
     * @param {object} schema - json of keys to PolyTypes
     * @param {boolean} strict - if props should be required (default false & can be overrided in validate)
     */
    constructor(schema = {}, strict = false) {
        this.schema = schema;
        this.strict = strict;
    }

    /**
     * determine if a object is valid according to the schema
     * @param {object} T - object to validate
     * @param {boolean} strict - if props should be required
     * @returns {Array} - array of errors
     * @example
     * schema.validate({
     *     _id: "Hello World"
     * }) // => []
     */
    validate(T, strict = null) {
        strict = strict === null ? this.strict : strict;
        const errors = [];

        /**
         * determine if anything is an object
         * @param {any} T - literally anything
         * @returns {boolean}
         */
        const isObject = (T) =>
            typeof T === "object" && T !== null && !PolyTypes.array(T);

        /**
         * determine if subset of this.schema is valid
         * @param {object} schema - subset of this.schema
         * @param {any} T - literally anything
         * @returns {boolean}
         */
        const core = (schema, T) => {
            // check if exactly equal
            if (schema === T) {
                return true;
            }

            // loop through T & check if all props are added
            if (strict) {
                for (const [key, _] of Object.entries(T)) {
                    if (
                        !(T.hasOwnProperty(key) && schema.hasOwnProperty(key))
                    ) {
                        errors.push(`${key} is not a valid property`);
                    }
                }
            }

            // loop through schema
            for (const [key, condition] of Object.entries(schema)) {
                // check if prop exists
                if (T.hasOwnProperty(key)) {
                    // check if prop is an object or if value matches condition
                    if (isObject(condition)) {
                        return core(schema[key], T[key]);
                    } else if (!condition(T[key])) {
                        errors.push(`${key} is not a valid value for `);
                    }
                } else if (strict) {
                    errors.push(`${key} must be provided`);
                }
            }

            return errors;
        };

        if (isObject(T)) {
            return core(this.schema, T);
        }

        errors.push(`${T} is not a valid object`);
        return errors;
    }
}

export default PolySchema;

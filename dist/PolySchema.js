"use strict";
/** @file src/PolySchema.ts */
Object.defineProperty(exports, "__esModule", { value: true });
const PolyCondition_1 = require("./PolyCondition");
const PolyTypes_1 = require("./PolyTypes");
/**
 * Core library for PolySchema
 */
class PolySchema {
    /**
     * PolySchema constructor
     * @param name - Name of the schema
     * @param schema - Schema to validate against
     * @param strict - Use strict validation to check existence of certain keys (defaults to false)
     */
    constructor(name, schema, strict = false) {
        this.name = name;
        this.schema = schema;
        this.strict = strict;
    }
    /**
     * Validate an object against the schema
     * @param object - Object to validate against the schema
     * @param strict - Override strict validation
     * @param verbose - Get errors (defaults to true)
     * @returns if verbose, returns true/false for valid/invalid; if not verbose, returns array of errors
     */
    validate(object, strict = null, verbose = true) {
        strict = PolyTypes_1.default.null.getCondition()(strict) ? this.strict : strict;
        const errors = [];
        const main = (schema, value) => {
            // loop through values & check if all props are added
            if (strict) {
                for (const [key, _] of Object.entries(value)) {
                    if (!(value.hasOwnProperty(key) &&
                        schema.hasOwnProperty(key))) {
                        errors.push(`${key} is not a valid property`);
                    }
                }
            }
            for (const [key, condition] of Object.entries(schema)) {
                // check if prop exists
                if (value.hasOwnProperty(key)) {
                    // check if prop is an object or if value matches condition
                    if (PolyTypes_1.default.object.getCondition()(condition) &&
                        !(condition instanceof PolyCondition_1.default)) {
                        return main(schema[key], value[key]);
                    }
                    else if (!condition.getCondition()(value[key])) {
                        errors.push(`${key} is not a valid value for ${condition.getName()}`);
                    }
                }
                else if (strict) {
                    errors.push(`${key} must be provided`);
                }
            }
            return errors;
        };
        if (PolyTypes_1.default.object.getCondition()(object)) {
            main(this.schema, object);
        }
        else {
            errors.push(`${object} is not a valid object, cannot check against schema`);
        }
        return verbose ? errors : errors.length === 0;
    }
    /**
     * Get the name of the schema
     * @returns Name of the schema
     */
    getName() {
        return this.name;
    }
}
exports.default = PolySchema;

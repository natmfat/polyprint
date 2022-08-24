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
     * @example
     * const schema = new PolySchema("Document Schema", { key: PolyTypes.string });
     */
    constructor(name, schema, strict = false) {
        this.name = name;
        this.schema = schema;
        this.strict = strict;
    }
    /**
     * Copy the current schema
     * @returns Copied schema
     * @example
     * schema.copy().validate({})
     */
    copy() {
        return new PolySchema(this.name, Object.assign({}, this.schema), this.strict);
    }
    /**
     * Merges another schema into the current schema; the new schema will override existing schema.
     * Use copy to create a new schema instead of modifying the original
     * @param schema - Schema to merge with current schema
     * @returns New merged schema
     * @example
     * schema.merge(new PolySchema("New Schema", { key: PolyTypes.string }))
     * @example
     * schema.merge({ key: PolyTypes.string })
     */
    merge(schema) {
        this.schema = Object.assign(Object.assign({}, this.schema), (schema instanceof PolySchema ? schema.getSchema() : schema));
        return this;
    }
    /**
     * Validate an object against the schema
     * @param object - Object to validate against the schema
     * @param verbose - Get errors (defaults to false)
     * @param strict - Override strict validation
     * @returns if verbose, returns true/false for valid/invalid; if not verbose, returns array of errors
     * @example
     * schema.validate({ key: "value" });
     */
    validate(object, verbose = false, strict = null) {
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
                    // allow for nested schemas
                    if (condition instanceof PolySchema) {
                        const errors = condition.validate(value[key], verbose, strict);
                        // add errors if necessary
                        if (errors && Array.isArray(errors)) {
                            errors.forEach((error) => errors.push(error));
                        }
                    }
                    // check if prop is an object or if value matches condition
                    else if (PolyTypes_1.default.object.getCondition()(condition) &&
                        !(condition instanceof PolyCondition_1.default)) {
                        return main(schema[key], value[key]);
                    }
                    else if (!condition.getCondition()(value[key])) {
                        errors.push(`${key} of ${value[key]} is not a valid value for type ${condition.getName()}`);
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
    /**
     * Determine if the schema is in strict mode
     * @returns If schema is strict
     */
    getStrict() {
        return this.strict;
    }
    /**
     * Get the schema
     * @returns Schema
     */
    getSchema() {
        return this.schema;
    }
    /**
     * Set new strict mode
     * @param strict - New strict mode
     * @returns Current schema for chaining
     */
    setStrict(strict) {
        this.strict = strict;
        return this;
    }
}
exports.default = PolySchema;

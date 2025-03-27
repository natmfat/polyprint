/** @file src/PolySchema.ts */

import { PolyCondition } from "./PolyCondition";
import { PolyTypes } from "./PolyTypes";

type Fragment = Record<string, any>;
type Errors = string[];

type OptionalConfig =
  | {
      verbose?: boolean;
      strict?: boolean;
    }
  | undefined;

const DEFAULT_OPTIONAL_CONFIG = {
  verbose: undefined,
  strict: undefined,
} as const;

/**
 * Core library for PolySchema
 */
export class PolySchema extends PolyTypes {
  name: string;
  schema: Fragment;
  strict: boolean;
  verbose: boolean;

  static Schema = PolySchema;

  /**
   * PolySchema constructor
   * @param name - Name of the schema
   * @param schema - Schema to validate against
   * @param config - Set default options to change the behavior of the validator
   * @param config.verbose - Get errors instead of a success/failure boolean (defaults to false)
   * @param config.strict - Strict validation to check existence of certain keys (defaults to false)
   * @example
   * const schema = new PolySchema("Document Schema", { key: PolyTypes.string });
   */
  constructor(
    name: string,
    schema: Fragment,
    {
      strict = false,
      verbose = false,
    }: OptionalConfig = DEFAULT_OPTIONAL_CONFIG
  ) {
    super();
    this.name = name;
    this.schema = schema;
    this.strict = strict;
    this.verbose = verbose;
  }

  /**
   * Copy the current schema
   * @returns Copied schema
   * @example
   * schema.copy().validate({})
   */
  copy() {
    return new PolySchema(
      this.name,
      { ...this.schema },
      { strict: this.strict }
    );
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
  merge(schema: PolySchema | Fragment) {
    this.schema = {
      ...this.schema,
      ...(schema instanceof PolySchema ? schema.schema : schema),
    };
    return this;
  }

  /**
   * Validate an object against the schema
   * @param object - Object to validate against the schema
   * @param config - Additional options to change the behavior of the validator
   * @param config.verbose - Override verbose setting
   * @param config.strict - Override strict validation
   * @returns If verbose, returns array of errors; otherwise, returns true for success and false for failure
   * @example
   * schema.validate({ key: "value" });
   */
  validate(
    object: any,
    { verbose, strict }: OptionalConfig = DEFAULT_OPTIONAL_CONFIG
  ): Errors | boolean {
    strict = PolyTypes.undefined.getCondition()(strict) ? this.strict : strict;
    verbose = PolyTypes.undefined.getCondition()(strict)
      ? this.verbose
      : verbose;

    const errors: Errors = [];

    const main = (schema: Fragment, value: Fragment): Errors => {
      // loop through values & check if all props are added
      if (strict) {
        for (const [key, _] of Object.entries(value)) {
          if (!(value.hasOwnProperty(key) && schema.hasOwnProperty(key))) {
            errors.push(`${key} is not a valid property`);
          }
        }
      }

      for (const [key, condition] of Object.entries(schema)) {
        // check if prop exists
        if (value.hasOwnProperty(key)) {
          // allow for nested schemas
          if (condition instanceof PolySchema) {
            const errors = condition.validate(value[key], { verbose, strict });

            // add errors if necessary
            if (errors && Array.isArray(errors)) {
              errors.forEach((error: string) => errors.push(error));
            }
          }

          // check if prop is an object or if value matches condition
          else if (
            PolyTypes.object.getCondition()(condition) &&
            !(condition instanceof PolyCondition)
          ) {
            return main(schema[key], value[key]);
          } else if (!condition.getCondition()(value[key])) {
            errors.push(
              `${key} of ${
                value[key]
              } is not a valid value for type ${condition.getName()}`
            );
          }
        } else if (strict) {
          errors.push(`${key} must be provided`);
        }
      }

      return errors;
    };

    if (PolyTypes.object.getCondition()(object)) {
      main(this.schema, object);
    } else {
      errors.push(
        `${object} is not a valid object, cannot check against schema`
      );
    }

    return verbose ? errors : errors.length === 0;
  }

  // TODO: schema.equals(anotherSchema)
  // TODO: schema.serialize(), convert into JSON format
  // TODO: schema.parse(), load from file or string
}

/** @file src/PolyTypes.ts  */

import { PolyCondition, PolyConditionFunction } from "./PolyCondition";

const renderArray = (array: any[]) =>
  `${array.map((t) => `(${t})`).join(" | ")}`;

/**
 * PolyTypes is a collection of static methods that are used to create a new PolySchema.
 */
export class PolyTypes {
  /**
   * Condition that checks if the value is of a class type
   * @param type - The class type to check against
   * @returns new PolyCondition
   * @example
   * car = new Car();
   * PolyTypes.instanceOf(Car).condition(car); // => true
   */
  static instanceOf(type: any): PolyCondition {
    return PolyTypes.condition(
      `instanceOf ${type.name || String(type)}`,
      (value: unknown) => value instanceof type
    );
  }

  /**
   * Wrapper around PolyCondition class
   * @param name - Name of the condition
   * @param condition - Condition function
   * @returns new PolyCondition instance
   */
  static condition(name: string, condition: PolyConditionFunction) {
    return new PolyCondition(name, condition);
  }

  /**
   * Condition that checks if the value is in an array
   * @param constants - The constants to check against
   * @returns new PolyCondition
   */
  static enum(...constants: any[]): PolyCondition {
    return PolyTypes.condition(`enum ${renderArray(constants)}`, (value: any) =>
      constants.includes(value)
    );
  }

  /**
   * Condition of multiple conditions
   * @param arrayTypes - The array types to check against
   * @returns new PolyCondition
   */
  static union(...arrayTypes: any[]): PolyCondition {
    return PolyTypes.condition(
      `union ${renderArray(arrayTypes)}`,
      (value: any) => arrayTypes.some((type) => type.condition(value))
    );
  }

  /**
   * Condition that checks if the value is null
   * @returns new PolyCondition
   */
  static get null(): PolyCondition {
    return PolyTypes.condition(
      `null`,
      (value: any) => value === null && value !== undefined
    );
  }

  /**
   * Condition that checks if the value is an array
   * @returns new PolyCondition
   */
  static get array(): PolyCondition {
    return PolyTypes.condition(`array`, (value: any) => Array.isArray(value));
  }

  /**
   * Condition that checks if the value is a boolean
   * @returns new PolyCondition
   */
  static get boolean(): PolyCondition {
    return PolyTypes.condition(
      `boolean`,
      (value: any) => typeof value === "boolean"
    );
  }

  /**
   * Condition that checks if the value is a number
   * @returns new PolyCondition
   */
  static get number(): PolyCondition {
    return PolyTypes.condition(
      `number`,
      (value: unknown) => typeof value === "number"
    );
  }

  /**
   * Condition that checks if the value is a string
   * @returns new PolyCondition
   */
  static get string(): PolyCondition {
    return PolyTypes.condition(
      `string`,
      (value: unknown) => typeof value === "string"
    );
  }

  /**
   * Condition that checks if the value is an object
   * @returns new PolyCondition
   */
  static get object(): PolyCondition {
    return PolyTypes.condition(
      `object`,
      (value: unknown) =>
        typeof value === "object" &&
        !PolyTypes.null.getCondition()(value) &&
        !PolyTypes.array.getCondition()(value)
    );
  }

  /**
   * Condition that checks if the value is a function
   * @returns new PolyCondition
   */
  static get function(): PolyCondition {
    return PolyTypes.condition(
      `function`,
      (value: unknown) => typeof value === "function"
    );
  }

  /**
   * Condition that checks if the value is undefined
   * @returns new PolyCondition
   */
  static get undefined(): PolyCondition {
    return PolyTypes.condition(
      `undefined`,
      (value: unknown) => value === undefined
    );
  }
}

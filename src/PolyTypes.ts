/** @file src/PolyTypes.ts  */

import PolyCondition, { pc } from "./PolyCondition.js";

const renderArray = (array: any[]) =>
    `${array.map((t) => `(${t})`).join(" | ")}`;

/**
 * PolyTypes is a collection of types that are used to create a new PolySchema.
 */
export default class PolyTypes {
    /**
     * Condition that checks if the value is of a class type
     * @param type - The class type to check against
     * @returns new PolyCondition
     * @example
     * car = new Car();
     * PolyTypes.instanceOf(Car).condition(car); // => true
     */
    static instanceOf(type: any): PolyCondition {
        return pc(
            `instanceOf ${type.name}`,
            (value: any) => value instanceof type
        );
    }

    /**
     * Condition that checks if the value is in an array
     * @param constants - The constants to check against
     * @returns new PolyCondition
     */
    static enum(...constants: any[]): PolyCondition {
        return pc(`enum ${renderArray(constants)}`, (value: any) =>
            constants.includes(value)
        );
    }

    /**
     * Condition of multiple conditions
     * @param arrayTypes - The array types to check against
     * @returns new PolyCondition
     */
    static union(...arrayTypes: any[]): PolyCondition {
        return pc(`union ${renderArray(arrayTypes)}`, (value: any) =>
            arrayTypes.some((type) => type.condition(value))
        );
    }

    /**
     * Condition that checks if the value is null
     * @returns new PolyCondition
     */
    static get null(): PolyCondition {
        return pc(
            `null`,
            (value: any) => value === null && value !== undefined
        );
    }

    /**
     * Condition that checks if the value is an array
     * @returns new PolyCondition
     */
    static get array(): PolyCondition {
        return pc(`array`, (value: any) => Array.isArray(value));
    }

    /**
     * Condition that checks if the value is a boolean
     * @returns new PolyCondition
     */
    static get boolean(): PolyCondition {
        return pc(`boolean`, (value: any) => typeof value === "boolean");
    }

    /**
     * Condition that checks if the value is a number
     * @returns new PolyCondition
     */
    static get number(): PolyCondition {
        return pc(`number`, (value: any) => typeof value === "number");
    }

    /**
     * Condition that checks if the value is a string
     * @returns new PolyCondition
     */
    static get string(): PolyCondition {
        return pc(`string`, (value: any) => typeof value === "string");
    }

    /**
     * Condition that checks if the value is an object
     * @returns new PolyCondition
     */
    static get object(): PolyCondition {
        return pc(
            `object`,
            (value: any) =>
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
        return pc(`function`, (value: any) => typeof value === "function");
    }

    /**
     * Condition that checks if the value is undefined
     * @returns new PolyCondition
     */
    static get undefined(): PolyCondition {
        return pc(`undefined`, (value: any) => value === undefined);
    }
}

/** @file src/PolyTypes.ts  */
import { pc } from "./PolyCondition.js";
const renderArray = (array) => `${array.map((t) => `(${t})`).join(" | ")}`;
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
    static instanceOf(type) {
        return pc(`instanceOf ${type.name}`, (value) => value instanceof type);
    }
    /**
     * Condition that checks if the value is in an array
     * @param constants - The constants to check against
     * @returns new PolyCondition
     */
    static enum(...constants) {
        return pc(`enum ${renderArray(constants)}`, (value) => constants.includes(value));
    }
    /**
     * Condition of multiple conditions
     * @param arrayTypes - The array types to check against
     * @returns new PolyCondition
     */
    static union(...arrayTypes) {
        return pc(`union ${renderArray(arrayTypes)}`, (value) => arrayTypes.some((type) => type.condition(value)));
    }
    /**
     * Condition that checks if the value is null
     * @returns new PolyCondition
     */
    static get null() {
        return pc(`null`, (value) => value === null && value !== undefined);
    }
    /**
     * Condition that checks if the value is an array
     * @returns new PolyCondition
     */
    static get array() {
        return pc(`array`, (value) => Array.isArray(value));
    }
    /**
     * Condition that checks if the value is a boolean
     * @returns new PolyCondition
     */
    static get boolean() {
        return pc(`boolean`, (value) => typeof value === "boolean");
    }
    /**
     * Condition that checks if the value is a number
     * @returns new PolyCondition
     */
    static get number() {
        return pc(`number`, (value) => typeof value === "number");
    }
    /**
     * Condition that checks if the value is a string
     * @returns new PolyCondition
     */
    static get string() {
        return pc(`string`, (value) => typeof value === "string");
    }
    /**
     * Condition that checks if the value is an object
     * @returns new PolyCondition
     */
    static get object() {
        return pc(`object`, (value) => typeof value === "object" &&
            !PolyTypes.null.getCondition()(value) &&
            !PolyTypes.array.getCondition()(value));
    }
    /**
     * Condition that checks if the value is a function
     * @returns new PolyCondition
     */
    static get function() {
        return pc(`function`, (value) => typeof value === "function");
    }
    /**
     * Condition that checks if the value is undefined
     * @returns new PolyCondition
     */
    static get undefined() {
        return pc(`undefined`, (value) => value === undefined);
    }
}

"use strict";
/** @file src/PolyTypes.ts  */
Object.defineProperty(exports, "__esModule", { value: true });
const PolyCondition_1 = require("./PolyCondition");
/**
 * PolyTypes is a collection of types that are used to create a new PolySchema.
 */
class PolyTypes {
    /**
     * Condition that checks if the value is of a class type
     * @param type - The class type to check against
     * @returns new PolyCondition
     * @example
     * car = new Car();
     * PolyTypes.instanceOf(Car).condition(car); // => true
     */
    static instanceOf(type) {
        return (0, PolyCondition_1.pc)(`instanceOf ${type.name}`, (value) => value instanceof type);
    }
    /**
     * Condition that checks if the value is in an array
     * @param constants - The constants to check against
     * @returns new PolyCondition
     */
    static enum(...constants) {
        return (0, PolyCondition_1.pc)(`enum ${constants.join(" | ")}`, (value) => constants.includes(value));
    }
    /**
     * Condition of multiple conditions
     * @param arrayTypes - The array types to check against
     * @returns new PolyCondition
     */
    static union(...arrayTypes) {
        return (0, PolyCondition_1.pc)(`union ${arrayTypes.join(" | ")}`, (value) => arrayTypes.some((type) => type.condition(value)));
    }
    /**
     * Condition that checks if the value is null
     * @returns new PolyCondition
     */
    static get null() {
        return (0, PolyCondition_1.pc)(`null`, (value) => value === null && value !== undefined);
    }
    /**
     * Condition that checks if the value is an array
     * @returns new PolyCondition
     */
    static get array() {
        return (0, PolyCondition_1.pc)(`array`, (value) => Array.isArray(value));
    }
    /**
     * Condition that checks if the value is a boolean
     * @returns new PolyCondition
     */
    static get boolean() {
        return (0, PolyCondition_1.pc)(`boolean`, (value) => typeof value === "boolean");
    }
    /**
     * Condition that checks if the value is a number
     * @returns new PolyCondition
     */
    static get number() {
        return (0, PolyCondition_1.pc)(`number`, (value) => typeof value === "number");
    }
    /**
     * Condition that checks if the value is a string
     * @returns new PolyCondition
     */
    static get string() {
        return (0, PolyCondition_1.pc)(`string`, (value) => typeof value === "string");
    }
    /**
     * Condition that checks if the value is an object
     * @returns new PolyCondition
     */
    static get object() {
        return (0, PolyCondition_1.pc)(`object`, (value) => typeof value === "object");
    }
    /**
     * Condition that checks if the value is a function
     * @returns new PolyCondition
     */
    static get function() {
        return (0, PolyCondition_1.pc)(`function`, (value) => typeof value === "function");
    }
    /**
     * Condition that checks if the value is undefined
     * @returns new PolyCondition
     */
    static get undefined() {
        return (0, PolyCondition_1.pc)(`undefined`, (value) => value === undefined);
    }
}
exports.default = PolyTypes;

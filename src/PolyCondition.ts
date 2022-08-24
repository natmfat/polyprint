/** @file src/PolyCondition.ts */

/**
 * Create a new condition, utility for PolyTypes & better errors in PolySchema
 */
export default class PolyCondition {
    private name: string;
    private condition: Function;

    /**
     * PolyCondition constructor
     * @param name - Name of the condition
     * @param condition - Condition function
     */
    constructor(name: string, condition: Function) {
        this.name = name;
        this.condition = condition;
    }

    getName() {
        return this.name;
    }

    getCondition() {
        return this.condition;
    }

    toString() {
        return this.name;
    }
}

/**
 * Wrapper around PolyCondition class
 * @param name - Name of the condition
 * @param condition - Condition function
 * @returns new PolyCondition instance
 */
export const pc = (name: string, condition: Function) =>
    new PolyCondition(name, condition);

"use strict";
/** @file src/PolyCondition.ts */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pc = void 0;
/**
 * Create a new condition, utility for PolyTypes & better errors in PolySchema
 */
class PolyCondition {
    /**
     * PolyCondition constructor
     * @param name - Name of the condition
     * @param condition - Condition function
     */
    constructor(name, condition) {
        this.name = name;
        this.condition = condition;
    }
    getName() {
        return this.name;
    }
    getCondition() {
        return this.condition;
    }
}
exports.default = PolyCondition;
/**
 * Wrapper around PolyCondition class
 * @param name - Name of the condition
 * @param condition - Condition function
 * @returns new PolyCondition instance
 */
const pc = (name, condition) => new PolyCondition(name, condition);
exports.pc = pc;

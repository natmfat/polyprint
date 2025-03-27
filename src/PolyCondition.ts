/** @file src/PolyCondition.ts */

/**
 * Create a new condition, utility for PolyTypes & better errors in PolySchema
 */
export class PolyCondition {
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

  /**
   * Get the name of the condition
   * @returns Name of condition
   */
  getName(): string {
    return this.name;
  }

  /**
   * Get the name of the condition
   * @returns Name of condition
   */
  toString() {
    return this.name;
  }

  /**
   * Get the condition function
   * @returns Condition function
   */
  getCondition() {
    return this.condition;
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

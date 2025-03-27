/** @file src/PolyCondition.ts */

export type PolyConditionFunction = (value: unknown) => boolean;

/**
 * Create a new condition, utility for PolyTypes & better errors in PolySchema
 */
export class PolyCondition {
  private name: string;
  private condition: PolyConditionFunction;

  /**
   * PolyCondition constructor
   * @param name - Name of the condition
   * @param condition - Condition function
   */
  constructor(name: string, condition: PolyConditionFunction) {
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

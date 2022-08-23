"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PolyCondition {
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

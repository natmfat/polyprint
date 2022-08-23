"use strict";
/** @file src/PolySchema.ts */
Object.defineProperty(exports, "__esModule", { value: true });
class PolySchema {
    constructor(name, schema, strict = false) {
        this.name = name;
        this.schema = schema;
        this.strict = strict;
    }
}
exports.default = PolySchema;
/**
new PolySChema("FormValidation", {
    _createdAt: PolyTypes.instanceOf(Date),
    _updatedAt: PolyTypes.instanceOf(Date),

    name: PolyTypes.string,
}, true)
 */

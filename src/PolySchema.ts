/** @file src/PolySchema.ts */

import PolyCondition from "PolyCondition";
import PolyTypes from "PolyTypes";

export default class PolySchema {
    private name: string;
    private schema: Object;
    private strict: boolean;

    constructor(name: string, schema: Object, strict = false) {
        this.name = name;
        this.schema = schema;
        this.strict = strict;
    }
}

/**
new PolySChema("FormValidation", {
    _createdAt: PolyTypes.instanceOf(Date),
    _updatedAt: PolyTypes.instanceOf(Date),

    name: PolyTypes.string,
}, true)
 */

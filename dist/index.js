"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolyCondition = exports.PolyTypes = void 0;
const PolyCondition_1 = require("./PolyCondition");
exports.PolyCondition = PolyCondition_1.default;
const PolySchema_1 = require("./PolySchema");
const PolyTypes_1 = require("./PolyTypes");
exports.PolyTypes = PolyTypes_1.default;
// console.log(
//     new PolySchema(
//         "FormValidation",
//         {
//             _createdAt: PolyTypes.instanceOf(Date),
//             _updatedAt: PolyTypes.instanceOf(Date),
//             name: PolyTypes.string,
//         },
//         true
//     ).validate({
//         _createdAt: new Date(),
//         _updatedAt: new Date(),
//         // name: "John Doe",
//     })
// );
exports.default = PolySchema_1.default;

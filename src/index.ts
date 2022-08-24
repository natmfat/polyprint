import PolyCondition from "./PolyCondition";
import PolySchema from "./PolySchema";
import PolyTypes from "./PolyTypes";

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

export default PolySchema;
export { PolyTypes, PolyCondition };

import PolySchema from "./PolySchema.js";
import PolyTypes from "./PolyTypes.js";

const schema = new PolySchema({
    _id: PolyTypes.arrayOf(PolyTypes.union(PolyTypes.string, PolyTypes.number)),
    _createdAt: PolyTypes.number,
});

console.log(schema.validate({
    _id: ['1', 0, 1],
    _createdAt: 0,
}))
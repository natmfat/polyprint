import PolySchema from "./PolySchema.js";
import PolyTypes from "./PolyTypes.js";

const schema = new PolySchema({
    _id: PolyTypes.string,
    _createdAt: PolyTypes.string,

    tags: PolyTypes.arrayOf(PolyTypes.enum("food", "code", "lifestyle", "health"))
});

console.log(schema.validate({
    _id: "eating-a-cheezit",
    _createdAt: "2022",
    tags: ["lifestyle", "health", "food"]
}))
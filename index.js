import PolySchema from "./PolySchema.js";
import PolyTypes from "./PolyTypes.js";

const schema = new PolySchema({
    _id: PolyTypes.union(PolyTypes.undefined, PolyTypes.string)
});

class Car {
    constructor() {
        this.name = "test"
    }
}


let car = new Car()

console.log(PolyTypes.instanceOf(PolySchema)(car))

// {
//     _id: { type: String },
//     _createdAt: { type: String },

//     title: { type: String },
//     tags: { type: Array }
// }

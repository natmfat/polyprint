import PolySchema, { PolyTypes } from "../index.js";

export default () => {
    const schema = new PolySchema({
        _id: PolyTypes.string,
        _createdAt: PolyTypes.string,
    });

    return {
        name: "Primitive Types",
        result:
            schema.validate({
                _id: "eating-a-cheezit",
                _createdAt: "2022",
            }) === true,
    };
};

import PolySchema, { PolyTypes } from "../src";

const schema = new PolySchema("Document Schema", {
    _createdAt: PolyTypes.instanceOf(Date),
    _updatedAt: PolyTypes.instanceOf(Date),
    title: PolyTypes.string,
    body: PolyTypes.string,
});

const strictSchema = schema.copy().setStrict(true);

test("(nonverbose) Schema against empty object or literal", () => {
    expect(schema.validate({})).toBe(true); // empty object
    expect(schema.validate("ok")).toBe(false); // literal
});

test("(nonverbose) Schema against valid object", () => {
    expect(
        schema.validate({
            _createdAt: new Date(),
            _updatedAt: new Date(),
            title: "Hello World!",
            body: "Example schema.",
        })
    ).toBe(true);
});

// TODO: more tests

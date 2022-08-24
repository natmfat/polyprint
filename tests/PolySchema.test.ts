import PolySchema, { PolyTypes, PolyCondition } from "../src";

const schema = new PolySchema("Document Schema", {
    _createdAt: PolyTypes.instanceOf(Date),
    _updatedAt: PolyTypes.instanceOf(Date),
    title: PolyTypes.string,
    body: PolyTypes.string,
});

const strictSchema = schema.copy().setStrict(true);

test("Schema against empty object or literal", () => {
    expect(schema.validate({})).toBe(true); // empty object
    expect(schema.validate("ok")).toBe(false); // literal
});

test("Schema against valid object", () => {
    expect(
        schema.validate({
            _createdAt: new Date(),
            _updatedAt: new Date(),
            title: "Hello World!",
            body: "Example schema.",
        })
    ).toBe(true);

    // invalid object (at least under strict mode)
    expect(
        schema.validate(
            {
                _createdAt: new Date(),
                _updatedAt: new Date(),
                title: "Hello World!",
            },
            false,
            true
        )
    ).toBe(false);
});

test("Nested schemas", () => {
    const userSchema = new PolySchema(
        "User",
        {
            _createdAt: PolyTypes.instanceOf(Date),
            id: new PolySchema("User Data", {
                name: PolyTypes.string,
            }),
        },
        true
    );

    expect(
        userSchema.validate({ _createdAt: new Date(), id: { name: "John" } })
    ).toBe(true);
});

test("Merged schema with objects", () => {
    const userSchema = new PolySchema("User", { id: PolyTypes.string }, true);
    userSchema.merge({ name: PolyTypes.string });

    expect(userSchema.validate({ id: "John", name: "John" })).toBe(true);
});

test("Merged schema with another schema", () => {
    const userSchema = new PolySchema("User", { id: PolyTypes.string }, true);
    userSchema.merge(
        new PolySchema("User Fragment", { name: PolyTypes.string })
    );

    expect(userSchema.validate({ id: "John", name: "John" })).toBe(true);
});

test("Strict schema", () => {
    expect(strictSchema.validate({ _createdAt: new Date() })).toBe(false);
});

test("Custom PolyCondition", () => {
    const customSchema = new PolySchema(
        "Custom Schema",
        {
            id: new PolyCondition(
                "Must have length of 3",
                (value: any) => value.length === 3
            ),
        },
        true
    );

    expect(customSchema.validate({ id: "sdf" })).toBe(true);
    expect(customSchema.validate({ id: "sddf" })).toBe(false);
});

// TODO: more tests

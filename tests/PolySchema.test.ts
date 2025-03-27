import { PolySchema, p } from "../src";
import { test, expect } from "vitest";

const schema = new p.Schema("Document Schema", {
  _createdAt: p.instanceOf(Date),
  _updatedAt: p.instanceOf(Date),
  title: p.string,
  body: p.string,
});

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
      {
        verbose: false,
        strict: true,
      }
    )
  ).toBe(false);
});

test("Nested schemas", () => {
  const userSchema = new PolySchema("User", {
    _createdAt: p.instanceOf(Date),
    id: new PolySchema("User Data", {
      name: p.string,
    }),
  });

  expect(
    userSchema.validate({ _createdAt: new Date(), id: { name: "John" } })
  ).toBe(true);
});

test("Merged schema with objects", () => {
  const userSchema = new PolySchema("User", { id: p.string }, { strict: true });
  userSchema.merge({ name: p.string });

  expect(userSchema.validate({ id: "John", name: "John" })).toBe(true);
});

test("Merged schema with another schema", () => {
  const userSchema = new PolySchema("User", { id: p.string }, { strict: true });
  userSchema.merge(new PolySchema("User Fragment", { name: p.string }));

  expect(userSchema.validate({ id: "John", name: "John" })).toBe(true);
});

test("Strict schema", () => {
  const strictSchema = schema.copy();
  strictSchema.strict = true;

  expect(strictSchema.validate({ _createdAt: new Date() })).toBe(false);
});

test("Custom PolyCondition", () => {
  const customSchema = new PolySchema("Custom Schema", {
    id: p.condition(
      "Must have length of 3",
      (value: any) => value.length === 3
    ),
  });

  expect(customSchema.validate({ id: "sdf" })).toBe(true);
  expect(customSchema.validate({ id: "sddf" })).toBe(false);
});

// TODO: more tests

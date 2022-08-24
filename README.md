![project banner](https://project-banner.phamn23.repl.co/?title=Poly+Schema&description=The+dead+simple+schema+builder.&stack=node)

# Poly Schema

The dead simple schema builder that allows you to define and validate custom data structures. See the [docs](https://nathan-pham.github.io/poly-schema/the-poly-schema/1.0.4/).

## Installation

```
>>> npm install the-poly-schema
```

```js
import PolySchema, { PolyTypes } from "the-poly-schema";
```

## Usage

This is a schema. You can use schemas to better define your data, which can be useful in form validation. In general, PolySchemas are composed of a dictionary with keys and values equal to some `PolyType`, `PolySchema`, or another dictionary.

```js
const schema = new PolySchema("Document Schema", {
    _createdAt: PolyTypes.instanceOf(Date),
    _updatedAt: PolyTypes.instanceOf(Date),
    title: PolyTypes.string,
    body: PolyTypes.string,

    // nested schema
    user: new PolySchema("Document Schema Child", {
        name: PolyTypes.string,
    }),

    // this will also work (but will not instantiate a new PolySchema)
    user: {
        name: PolyTypes.string,
    },
});
```

### Validating data

`validate` allows you to validate some data. It also accepts several arguments beyond a data structure, including `verbose` and `strict`.

-   `verbose`: Will return an array of errors instead of true or false (defaults to false)
-   `strict`: Enable strict mode (discussed below, defaults to schema value)

```js
schema.validate({
    title: "Hello World",
}); // => true

schema.validate({
    title: 0,
}); // => false

schema.validate(
    {
        title: 0,
    },
    false,
    true
); // => false because strict mode is enabled
```

### Strict Mode

By default, schemas are NOT in strict mode, which means it will ignore extra or missing keys. You can easily enable or disable strict mode, or override your choice when you call `validate`.

Method 1: Create a new schema with strict mode by default

```js
new PolySchema("Untitled Schema", {}, true);
```

Method 2: Change strict mode later

```js
schema.setStrict(true);
```

Method 3: Override in `validate`

```js
schema.validate({}, false, true);
```

### Flexible Types

In addition to basic primitives like `number` and `string`, you can "compose" types with `enum` and `union`. You can find a full list of all of the types supported by `PolyType` in the file docs.

Union is like "or", so `flexibleType` can either be a string or a number.

```js
{
    flexibleType: PolyTypes.union(PolyTypes.string, PolyTypes.number);
}
```

Enums are for literal values, so `enumType` can be "RED", "BLUE", or "GREEN" (but nothing else).

```js
{
    enumType: PolyTypes.enum("RED", "BLUE", "GREEN");
}
```

You can also create custom types (perhaps for a more custom situation) with `PolyCondition`.

```js
import { PolyCondition } from "the-poly-schema";

{
    customType: new PolyCondition(
        "String of length 3",
        (value: any) => typeof value === "string" && value.length === 3
    );
}
```

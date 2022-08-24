import PolyTypes from "../src/PolyTypes";

test("instanceOf car should be Car", () => {
    class Bike {}
    class Car {}

    const bike = new Bike();
    const car = new Car();
    const polyType = PolyTypes.instanceOf(Car).getCondition();

    expect(polyType(car)).toBe(true);
    expect(polyType(bike)).toBe(false);
});

test("enum should have RED | GREEN | BLUE", () => {
    const enumColors = ["RED", "GREEN", "BLUE"];
    const polyType = PolyTypes.enum(...enumColors).getCondition();

    expect(polyType("RED")).toBe(true);
    expect(polyType("GREEN")).toBe(true);
    expect(polyType("BLUE")).toBe(true);
    expect(polyType("PURPLE")).toBe(false);
});

test("union should have several types", () => {
    const polyType = PolyTypes.union(
        PolyTypes.number,
        PolyTypes.string
    ).getCondition();

    expect(polyType(1)).toBe(true);
    expect(polyType("1")).toBe(true);
});

test("null should be null", () => {
    const polyType = PolyTypes.null.getCondition();

    expect(polyType(null)).toBe(true);
    expect(polyType(undefined)).toBe(false);
});

test("an array should be an array", () => {
    const polyType = PolyTypes.array.getCondition();

    expect(polyType([])).toBe(true);
    expect(polyType({})).toBe(false);
});

test("a boolean should be a boolean", () => {
    const polyType = PolyTypes.boolean.getCondition();

    expect(polyType(true)).toBe(true);
    expect(polyType(false)).toBe(true);
    expect(polyType(1)).toBe(false);
    expect(polyType("true")).toBe(false);
});

test("a number should be a number", () => {
    const polyType = PolyTypes.number.getCondition();

    expect(polyType(1)).toBe(true);
    expect(polyType(1.1)).toBe(true);
    expect(polyType(0)).toBe(true);
    expect(polyType(-1)).toBe(true);
    expect(polyType("1")).toBe(false);
});

test("a string should be a string", () => {
    const polyType = PolyTypes.string.getCondition();

    expect(polyType("")).toBe(true);
    expect(polyType("1")).toBe(true);
    expect(polyType(1)).toBe(false);
    expect(polyType(true)).toBe(false);
});

test("an object should be an object", () => {
    const polyType = PolyTypes.object.getCondition();

    expect(polyType({})).toBe(true);
    expect(polyType([])).toBe(false);
    expect(polyType(null)).toBe(false);
    expect(polyType(undefined)).toBe(false);
});

test("a function should be a function", () => {
    const polyType = PolyTypes.function.getCondition();

    expect(polyType(() => {})).toBe(true);
});

test("undefined should be undefined", () => {
    const polyType = PolyTypes.undefined.getCondition();

    expect(polyType(undefined)).toBe(true);
    expect(polyType(null)).toBe(false);
});

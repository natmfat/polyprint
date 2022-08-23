import primitiveTypes from "./primitiveTypes.js";

const tests = [primitiveTypes];

tests.forEach((test) => {
    const { name, result } = test();
    console.log(`${result ? "✅" : "❌"} ${name || "Untitled Test"} `);
});

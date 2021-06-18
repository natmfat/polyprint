import { schema } from "./schema.js"

const expect = true
const failed = []

// const arrayTemplate = Array.from({length: 3}, () => Number)

const tests = [
    {args: [undefined, undefined], expect},
    {args: [null, null], expect},
    
    {args: ["state-box", String], expect},
    {args: ["state-box", String, {length: 9}], expect},
    {args: ["state-box", String, {min: 0, max:5}]},

    {args: [5, Number], expect},
    {args: [5.3, Number, {integer: true}]},
    {args: [5, Number, {finite: true}], expect},
    {args: [6, Number, {even: true}], expect},
    {args: [6, Number, {min: 0, max: 10}], expect},
    
    {args: [true, Boolean], expect},
    {args: [false, Boolean], expect},

    {args: [[1, 2, 3], [Number, Number, Number]], expect},
    {args: [[1, 2, 3], Array.from({length: 3}, () => Number)], expect},

    {args: [(() => {}), Function], expect},

    {args: [{test: "hello"}, {test: String}], expect},
    {args: [{test: {sub_test: "hello"}}, {test: {sub_test: Number}}]},
    {args: [{test: {sub_test: "hello"}}, {test: {sub_test: String}}], expect}
    // {args: [], expect},
    // {args: [], expect},

].forEach(({args, expect}, testID) => {
    console.log("test:", testID)
    console.log("args:", args)

    const result = schema(...args)
    const summary = result == !!expect ? "passed" : "failed"
    console.log("result:", result)
    console.log(summary, "test:", testID, "\n")


    if(summary == "failed") {
        failed.push(testID)
    }
})

console.log("failed:", failed.length == 0 ? "none" : failed.join(', '))
// console.log(Array.from({length: 3}, () => Number))
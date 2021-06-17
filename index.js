const expect = {
    "undefined": (v) => v == undefined,
    "null": (v) => v == null && v !== undefined,

    "string": (v, {length, min=0, max=Infinity}) => (
        typeof v == "string"
            && (length ? v.length == length : true)
            && (v.length >= min && v.length <= max)
    ),

    "number": (v, {finite, integer, even, min=0, max=Infinity}) => (
        isNaN(v) 
            ? false
            : (finite ? isFinite(v) : true)
                && (integer ? parseInt(v) == v : true)
                && (even ? v % 2 == 0 : true)
                && (v >= min && v <= max)
    ),

    "boolean": (v) => (
        typeof v == "boolean"
    ),
    
    "array": (v, {length, min=0, max=Infinity, format}) => (
        Array.isArray(v)
            ? (length ? v.length == length : true)
                && (v.length >= min && v.length <= max)
                && (format ? v.filter((f, i) => type(format[i]) == type(f)).length == v.length : true)
            : false
    ),

    "function": (v) => (
        typeof v == "function"
    ),

    "object": (v, _, template) => {
        const passed = typeof v == "object" && v !== null

        if(passed) {
            for(const [key, value] of Object.entries(v)) {
                if(template.hasOwnProperty(key)) {
                    return s(value, template[key])
                } else {
                    return false
                }
            }
        } else {
            console.log("not an object")
            return false
        }
    }
}

const type = (check) => {
    const main = () => {
        const str = String(check.prototype ? check.prototype.constructor : check.constructor).toLowerCase()
        const cname = str.match(/function\s(\w*)/)[1]
        const aliases = ['', 'anonymous']
    
        return aliases.includes(cname) ? "function" : cname
    }

    return check
        ? main(check)
        : typeof check == "object" && check == null
            ? "null"
            : typeof check
}

export const s = (v, template, options={}) => {
    const method = type(template)

    if(method == "array") {
        options.format = template
    }

    console.log("method:", method)

    if(expect.hasOwnProperty(method)) {
        return expect[method](v, options, template)
    } else {
        console.log("unknown method")
        return false 
    }
}
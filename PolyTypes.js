const PolyTypes = new Proxy(
    {
        instanceOf(type) {
            return (instance) => type.name === instance.constructor.name;
        },

        arrayOf(type) {
            return (array) => {
                for (const element of array) {
                    if (!type(element)) {
                        return false;
                    }
                }

                return true;
            };
        },

        enum(...constants) {
            return (T) => constants.flat(Infinity).includes(T);
        },

        union(...arrayTypes) {
            return (T) => {
                for (const condition of arrayTypes.flat(Infinity)) {
                    if (condition(T)) {
                        return true;
                    }
                }

                return false;
            };
        },

        undefined: (v) => v == undefined,
        null: (v) => v == null && v !== undefined,
    },
    {
        get(_, prop) {
            const primitiveTypes = ["boolean", "number", "function", "string"];

            if (primitiveTypes.includes(prop)) {
                return (T) => typeof T == prop;
            } else if (prop == "array") {
                return (T) => Array.isArray(T);
            }

            return Reflect.get(...arguments);
        },
    }
);

export default PolyTypes;
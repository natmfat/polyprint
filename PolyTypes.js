const PolyTypes = new Proxy(
    {
        /**
         * generates a function that compares type with an instance
         * @param {object} type - class to check
         * @returns {function} - instanceof operator clone
         * @example
         * car = new Car()
         * PolyTypes.instanceOf(Car)(car) // => true
         */
        instanceOf(type) {
            /**
             * sort of replicates the instanceof operator by comparing constructor names
             * @param {object} instance - the specific instance of the class
             * @returns {boolean}
             */
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

        undefined(T) {
            return T == undefined;
        },

        null(T) {
            return T === null && T !== undefined;
        },

        array(T) {
            return Array.isArray(T);
        },
    },
    {
        get(_, prop) {
            const primitiveTypes = ["boolean", "number", "function", "string"];

            if (primitiveTypes.includes(prop)) {
                return (T) => typeof T == prop;
            }

            return Reflect.get(...arguments);
        },
    }
);

export default PolyTypes;

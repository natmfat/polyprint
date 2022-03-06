/** @file src/PolyTypes.js */

/**
 * identify primitive & complex data types
 * @namespace PolyTypes
 */
const PolyTypes = new Proxy(
    {
        /**
         * generates a function that compares type with an instance
         * @param {object} type - class to check
         * @returns {function} - instanceof operator clone
         * @memberof PolyTypes
         * @namespace PolyTypes.instanceOf
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

        // TODO: build jsdoc comments into documentation
        // TODO: publish to npm

        /**
         * generates a function that checks if all elements in an array are of a certain type
         * @param {object} type - PolyType primitive data type
         * @returns {function}
         * @memberof PolyTypes
         * @namespace PolyTypes.arrayOf
         * @example
         * PolyTypes.arrayOf(PolyTypes.number)
         */
        arrayOf(type) {
            /**
             * loops through each element in the list & checks its type
             * @param {any[]} array - list to check
             * @returns {boolean}
             */
            return (array) => {
                for (const element of array) {
                    if (!type(element)) {
                        return false;
                    }
                }

                return true;
            };
        },

        /**
         * generates a function that checks if an item is in a defined list
         * @param  {...any} constants - literally any literal
         * @returns {function}
         * @memberof PolyTypes
         * @namespace PolyTypes.enum
         * @example
         * PolyTypes.enum("HELLO", "WORLD")
         */
        enum(...constants) {
            /**
             * check if an item is in a list
             * @param {any} T - literally anything
             * @returns {boolean}
             */
            return (T) => constants.flat(Infinity).includes(T);
        },

        /**
         * generates a function that can check for multiple different types (more flexibility)
         * @param  {...any} arrayTypes - list of PropTypes
         * @returns {function}
         * @memberof PolyTypes
         * @namespace PolyTypes.union
         * @example
         * PolyTypes.union(
         *     PolyTypes.string
         *     PolyTypes.number
         * )
         */
        union(...arrayTypes) {
            /**
             * combine a list of types together and check if any of them are true
             * @param {any} T - literally anything
             * @returns {boolean}
             */
            return (T) => {
                for (const condition of arrayTypes.flat(Infinity)) {
                    if (condition(T)) {
                        return true;
                    }
                }

                return false;
            };
        },

        /**
         * check if something is null
         * @param {any} T - literally anything
         * @returns {boolean}
         * @memberof PolyTypes
         * @namespace PolyTypes.null
         * @example
         * PolyTypes.null(null)
         */
        null(T) {
            return T === null && T !== undefined;
        },

        /**
         * check if something is an array
         * @param {T} T - literally anything
         * @returns {boolean}
         * @memberof PolyTypes
         * @namespace PolyTypes.array
         * @example
         * PolyTypes.array([1, 2, 3])
         */
        array(T) {
            return Array.isArray(T);
        },
    },
    {
        get(_, prop) {
            // possibly the most jank setup for including proxy methods in jsdoc

            /**
             * generates a function that checks if something is a boolean
             * @param {T} - literally anything
             * @returns {function}
             * @memberOf PolyTypes
             * @namespace PolyTypes.boolean
             * @example
             * PolyTypes.boolean(true)
             */

            /**
             * generates a function that checks if something is a number
             * @param {T} - literally anything
             * @returns {function}
             * @memberOf PolyTypes
             * @namespace PolyTypes.number
             * @example
             * PolyTypes.number(1)
             */

            /**
             * generates a function that checks if something is a function
             * @param {T} - literally anything
             * @returns {boolean}
             * @memberOf PolyTypes
             * @namespace PolyTypes.function
             * @example
             * PolyTypes.function(() => {})
             */

            /**
             * generates a function that checks if something is a string
             * @param {T} - literally anything
             * @returns {boolean}
             * @memberOf PolyTypes
             * @namespace PolyTypes.string
             * @example
             * PolyTypes.string("Hello World")
             */

            /**
             * generates a function that checks if something is undefined
             * @param {T} - literally anything
             * @returns {boolean}
             * @memberOf PolyTypes
             * @namespace PolyTypes.undefined
             * @example
             * PolyTypes.undefined()
             */

            const primitiveTypes = ["boolean", "number", "function", "string", "undefined"];

            if (primitiveTypes.includes(prop)) {
                return (T) => typeof T == prop;
            }

            return Reflect.get(...arguments);
        },
    }
);

export default PolyTypes;

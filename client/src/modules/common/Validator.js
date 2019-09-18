/**
 * Usage
 *  1. create instance of Validator object and provide set of rules
 *      see createRulesFor()
 *  3. call process() function to validate
 *
 * */
export default class Validator {
    constructor(rules) {
        /**
         *  set of rules to be executed separately.
         *      see createRulesFor() function return value in
         *  For validation to pass - all function callbacks must return true for appropriate key.
         *      see validateRules() function for implementation
         * */
        this.rules = rules;
        /**
         * @param inputData
         * @param previousValidationState this.state.form.validation
         * */
        this.process = (inputData, previousValidationState) => {

            /** validationResult
             *  is populated from state
             *  will be changed based on validateRules() function return value
             *  will be returned to overwrite state.validation object during setState*/
            const validationResult = {...previousValidationState};

            //todo implement inputData foreach instead of validating only first key/value pair

            // get key of argument { login:"johndoe@mail.ru" }
            const key = Object.keys(inputData)[0];

            /**
             * combination of {
             *     isValid: state.validation // { key1:true key2:false }
             *     invalidErrors: state.validation.errors  // {key1:['err1','err2'] key2:[]}
             * }
             * */
            const mixedValidationResult = validateRules(this.rules[key], inputData[key]);

            validationResult[key] = mixedValidationResult.isValid;
            validationResult.errors[key] = mixedValidationResult.invalidErrors;

            return validationResult;

            // private functions
            function validateRules(rules, userInput) {
                /** is valid ? for all rules per single key (login , password ...) */
                let isValid = true; //
                /** Representing failure cause , when isValid === false */
                let invalidErrors = [];
                for (let next in rules) {
                    if (rules.hasOwnProperty(next)) {

                        /**
                         * true if single validity rule fulfilled
                         * string if not , representing failure cause
                         * */
                        let isValidForSingleRule = rules[next](userInput);
                        // rule function will be lengthMin, lengthMax etc ...
                        // see rules object passed to Validator Class constructor

                        // if validation passed , returned true
                        // if validation failed error text is returned
                        if (typeof isValidForSingleRule === 'string') {
                            invalidErrors.push(isValidForSingleRule);

                            // changing string to boolean after extracting corresponding error to separate array
                            isValidForSingleRule = false;
                        }
                        // isValid will always be boolean type
                        // combining validation result per single rule
                        isValid = isValid && isValidForSingleRule;
                    }
                }
                return {
                    isValid: isValid,
                    invalidErrors: invalidErrors
                };
            }
        };
    }
}

/**
 * @param fieldKeyNames undefined|string Array , representing key names of fields
 *      case string Array will provide rules only matching the keys provided
 *      case undefined will provide all predefined rules
 * */
export function createRulesFor(fieldKeyNames) {
    if (fieldKeyNames === undefined) {
        return getCoreRules();
    }
    return combineRules(fieldKeyNames);
}

/**
 * Used to get specific set of rules
 * */
function combineRules(keyNames) {
    // returned value
    const finalRules = {};
    const core = getCoreRules();
    keyNames.forEach((key) => {
        finalRules[key] = core[key];
    });
    return finalRules;
}

/**
 * Used to get Core object with all predefined rules
 * */
function getCoreRules() {
    return {
        /** key to match during Validator.process({key:value}, arg) */
        login: {
            /** function names are purely ecstatic , using for(a of b) */
            lengthMin: input => {
                if (input.length >= 3) {
                    return true;
                } else {
                    return "length min >= 3 bla bla bla";
                }
            },
            lengthMax: input => {
                if (input.length < 300) {
                    return true;
                } else {
                    return "length max < 300 bla bla bla";
                }
            },
            lengthTemp: input => {
                if (input.length >= 5) {
                    return true;
                } else {
                    return "length temp >=5 bla bla bla";
                }
            },

        },
        password: {
            lengthMin: input => {
                return input.length >= 8
            },
            lengthMax: input => {
                return input.length < 32
            },
        },
    }
}


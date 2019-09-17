import React from "react";
import {connect} from "react-redux";

import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import {loginAttempt,} from "../../redux/action";

class ConnectedLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** form control handlers */
            form: {
                validation: {
                    login: false,
                    password: false,
                    isSubmitEnabled: false,
                    errors: {
                        login: [],
                        password: [],
                        isSubmitEnabled: [],
                    }
                },
            },
            /** user input of corresponding fields */
            credentials: {
                //todo STOPSHIP for testing purposes , default values must be empty strings
                //todo research uncontrolled input in React and refactor accordingly
                login: "levayv@mail.ru",
                password: "123456789",
                // login: "",
                // password: "",
            }
        };
        /** user input inside LOGIN field */
        this.updateLogin = (event) => {
            const newLoginValue = event.target.value;
            const currentState = {...this.state};
            currentState.credentials.login = newLoginValue;
            // currentState.form.validation = this.validate(newLoginValue, null);
            currentState.form.validation = this.validator.process(
                {login: newLoginValue}, currentState.form.validation);
            currentState.form.validation.isSubmitEnabled = this.updateButton(currentState.form.validation);
            this.setState({...currentState});
        };
        /** user input inside PASSWORD field */
        this.updatePassword = (event) => {
            const newPasswordValue = event.target.value;
            const currentState = {...this.state};
            currentState.credentials.password = newPasswordValue;
            // currentState.form.validation = this.validate(newLoginValue, null);
            currentState.form.validation = this.validator.process(
                {password: newPasswordValue}, currentState.form.validation);
            currentState.form.validation.isSubmitEnabled = this.updateButton(currentState.form.validation);
            this.setState({...currentState});
        };
        /** todo refactor updateButton  */
        this.updateButton = (validationData) => {
            return validationData.login && validationData.password;
        };
        /** user click on LOGIN button */
        this.handleLogin = () => {
            this.props.loginAttempt(this.state.credentials);    // axios.post(
        };
    }

    componentDidMount() {
        class Validator {
            constructor(rules) {
                /**
                 *  set of rules to be executed separately.
                 *  For validation to pass - all function callbacks must return true for appropriate key.
                 *  see validateRules() function for implementation
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
                        let isValid = true; // is valid ? for all rules per key (of inputField) (login , password ...)
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

        this.validator = new Validator(
            /** see class Validator constructor */
            {
                /** key to match during Validator.process({key:value}, arg) */
                login: {
                    /** function names are purely ecstatic , using for(a of b) */
                    lengthMin: input => {
                        if (input.length >= 3) {
                            return true;
                        } else {
                            return "length min bla bla";
                        }
                    },
                    lengthMax: input => {
                        if (input.length < 300) {
                            return true;
                        } else {
                            return "length max bla bla";
                        }
                    },
                    lengthTemp: input => {
                        if (input.length >= 5) {
                            return true;
                        } else {
                            return "length temp bla bla";
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
            },
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LabeledInput
                    displayName={"Login"}
                    placeholder={"YourEmail@mail.xx"}
                    onChange={this.updateLogin}
                    value={this.state.credentials.login}
                />
                <LabeledInput
                    displayName={"Password"}
                    placeholder={"1234"}
                    onChange={this.updatePassword}
                    value={this.state.credentials.password}
                />
                <Button
                    displayName={"Sign-in"}
                    onClick={this.handleLogin}
                    disabled={!this.state.form.validation.isSubmitEnabled}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginAttempt: credentials => dispatch(loginAttempt(credentials)),
    };
}

const LoginPage = connect(null, mapDispatchToProps)(ConnectedLoginPage);
export default LoginPage;
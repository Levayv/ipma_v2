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
                isSubmitEnabled: false,
                validation: {
                    login: false,
                    password: false,
                }
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
            currentState.form.validation = this.validate(newLoginValue, null);
            currentState.form.isSubmitEnabled = this.updateButton(currentState.form.validation);
            this.setState({...currentState});
        };
        /** user input inside PASSWORD field */
        this.updatePassword = (event) => {
            const newPasswordValue = event.target.value;
            const currentState = {...this.state};
            currentState.credentials.password = newPasswordValue;
            currentState.form.validation = this.validate(null, newPasswordValue);
            currentState.form.isSubmitEnabled = this.updateButton(currentState.form.validation);
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
        //todo change to object , export to different file
        this.validate = (loginArg, passwordArg) => {
            /** validationResult
             *  will be changed based on validateRules() function return value
             *  will be returned to overwrite state.validation object during setState*/
            const validationResult = {
                login: this.state.form.validation.login,
                password: this.state.form.validation.password,
            };
            const validationRules = {
                /** set of rules to be executed separately.
                 *  For validation to pass - all function callbacks must return true.
                 *  see validateEachRule() function for implementation
                 * */
                forLogin: {
                    lengthMin: input => {
                        return input.length >= 3;
                    },
                    lengthMax: input => {
                        return input.length < 300
                    },
                },
                forPassword: {
                    lengthMin: input => {
                        return input.length >= 8
                    },
                    lengthMax: input => {
                        return input.length < 32
                    },
                },
            };

            /**
             * Validate given rules for given user's input
             * @param rules nested object of validationRules
             * @param userInput value fetched from form
             * */
            function validateRules(rules, userInput) {
                let isValid = true;
                for (let next in rules) {
                    if (rules.hasOwnProperty(next)) {
                        isValid = isValid && rules[next](userInput);  // rule function will be lengthMin, lengthMax etc ...
                    }
                }
                return isValid;
            }

            //todo refactor
            if (loginArg !== null) {
                validationResult.login = validateRules(validationRules.forLogin, loginArg);
            }
            if (passwordArg !== null) {
                validationResult.password = validateRules(validationRules.forPassword, passwordArg);
            }
            return validationResult;
        };
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
                    disabled={!this.state.form.isSubmitEnabled}
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
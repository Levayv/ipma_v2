import React from "react";
import {connect} from "react-redux";

import {loginAttempt,} from "../../redux/action";

import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import Validator from '../common/Validator'
import {createRulesFor} from '../common/Validator'


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
        const rules = createRulesFor([
            'login',
            'password',
        ]);

        this.validator = new Validator(rules);
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
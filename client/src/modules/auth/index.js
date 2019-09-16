import React from "react";
import {connect} from "react-redux";

import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import {
    loginAttempt,
} from "../../redux/action";

class ConnectedLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** form control handles*/
            form: {
                submitDisabled: true,
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
            this.setState({currentState});
            // this.setState(state =>
            //     Object.assign({}, state, {
            //         credentials: {
            //             login: newLoginValue,
            //             password: state.credentials.password,
            //         }
            //     }));
        };
        /** user input inside PASSWORD field */
        this.updatePassword = (event) => {
            const newPasswordValue = event.target.value;
            const currentState = {...this.state};
            currentState.credentials.password = newPasswordValue;
            this.setState({currentState});
            // this.setState(state =>
            //     Object.assign({}, state, {
            //         credentials: Object.assign({}, state.credentials, {
            //                 // login: state.credentials.login,
            //                 password: newPasswordValue,
            //             }
            //         )
            //     }));
        };
        /** user click on LOGIN button */
        this.handleLogin = () => {
            this.props.loginAttempt(this.state.credentials);    // axios.post(
        }
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
                    disabled={this.state.form.submitDisabled}
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
import React from "react";
import {connect} from "react-redux";

import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import {
    loginAttempt,
} from "../../redux/action";

//  tada * connect redux store
//  tada * add button
//  tada * button click must make request
//  tada ** request endpoint is localhost:8000/api/auth/login
//  todo ** request must have specified headers [see postman]
//  todo *** optimise headers using axios's global config
//  tada ** request must have body credentials
//  todo * research axios interceptor
//  todo * wrap axios inside custom "fetcher"
//

class ConnectedLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** user input of corresponding fields */
            credentials: {
                //todo STOPSHIP for testing purposes , default values must be empty strings
                login: "levayv@mail.ru",
                password: "123456789",
            }
        };
        /** user input inside LOGIN field */
        this.updateLogin = (event) => {
            const newLoginValue = event.target.value;
            this.setState(state =>
                Object.assign({}, state, {
                    credentials: {
                        login: newLoginValue,
                        password: state.credentials.password,
                    }
                }));
        };
        /** user input inside PASSWORD field */
        this.updatePassword = (event) => {
            const newPasswordValue = event.target.value;
            this.setState(state =>
                Object.assign({}, state, {
                    credentials: Object.assign({}, state.credentials, {
                            // login: state.credentials.login,
                            password: newPasswordValue,
                        }
                    )
                }));
        };
        /** user click on LOGIN button */
        this.handleLogin = () => {
            this.props.loginAttempt(this.state.credentials);    // axios.post(
        }
    }

    // todo for testing only
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log(" --- Component Did Update --- ")
    //     console.log("current / previous state")
    //     console.log(this.state)
    //     console.log(prevState)
    //     console.log("current / previous state")
    //     console.log(this.props)
    //     console.log(prevProps)
    //     console.log(" --- END ---")
    // }

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
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loginAttempt: credentials => dispatch(loginAttempt(credentials)),
    };
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPage);
export default LoginPage;
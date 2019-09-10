import React from "react";
import LabeledInput from "../common/LabeledInput";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                login: "",
                password: "",
            }
        };
        this.updateLogin = (event) => {
            const newLoginValue = event.target.value;
            this.setState(state =>
                Object.assign({}, state, {
                    credentials: {
                        login: newLoginValue,
                        password: state.credentials.password,
                    }
                }));
            console.log("!", this.state)
        };
        this.updatePassword = (event) => {
            const newPasswordValue = event.target.value;
            this.setState(state =>
                Object.assign({}, state, {
                    credentials: {
                        login: state.credentials.login,
                        password: newPasswordValue,
                    }
                }));
            console.log("!", this.state)
        };
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
            </div>
        );
    }
}

export default LoginPage;
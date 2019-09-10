import React from "react";
import LabeledInput from "../common/LabeledInput";
import Button from "../common/Button";
import axios from "axios";

//  todo * connect redux store
//  todo * add button
//  todo * button click must make request
//  todo ** request endpoint is localhost:8000/api/auth/login
//  todo ** request must have specified headers [see postman]
//  todo ** request must have body credentials
//

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** user input of corresponding fields */
            credentials: {
                login: "",
                password: "",
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
            console.log("!", this.state)
        };
        /** user input inside PASSWORD field */
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
        /** user click on LOGIN button */
        this.handleLogin = () => {
            axios.post(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/login",
                {
                    email: this.state.credentials.login,
                    password: this.state.credentials.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((/*response*/) => {
                // console.log(response.status);
                // console.log(response.data);
                //todo add dispatch to store

            }).catch(error => {
                console.log(`[ERROR CODE:${error.response.status}] ${error.response.data.error}`);
            });
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

export default LoginPage;
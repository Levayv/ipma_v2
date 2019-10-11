import React from "react";
import axios from "axios";
import {cloneDeep} from "lodash";

import Button from "../common/Button";
import history from "../../route/history";
import {saveTokenToLocalStorage} from "../../api/mapStoreToLocal";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {},
        };
        this.getCurrentUserAttempt = () => {
            axios.get(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/me",
            ).then(response => this.getCurrentUserSuccess(response)
            ).catch(() => {/* will be handled by interceptors*/
                }
            );
        };
        this.getCurrentUserSuccess = (response) => {
            let newState = cloneDeep(this.state);
            newState.loading = false;
            newState.user.name = response.data.name;
            newState.user.email = response.data.email;
            newState.user.role = response.data.role_id;
            this.setState(newState,
                lessonCreateSuccessAction
            );

            function lessonCreateSuccessAction() {
                //todo add staff
            }
        };
        this.handleLogOut = () => {
            saveTokenToLocalStorage(undefined);
            history.push('/home');
        };
    }

    componentDidMount() {
        let newState = cloneDeep(this.state);
        newState.loading = true;
        this.setState(
            newState,
            this.getCurrentUserAttempt
        )
    }

    render() {
        const renderGreetings = () => {
            console.log("!!!" , this.state.user);
            if (this.state.user.name) {
                return (<div>
                    <div>Welcome back {this.state.user.name}</div>
                    <div>Email is {this.state.user.email}</div>
                    <div>Role is {this.state.user.role}</div>
                </div>);
            } else
                return ("");
        };
        const renderLogOutButton = () => {
            if (this.state.user.name) {
                return (
                    <Button
                        displayName={'Sign-Out'}
                        onClick={this.handleLogOut}

                        variant={"primary"}
                    />
                );
            } else
                return ("");
        };
        return <div>
            <div> {renderLogOutButton()}</div>
            <h1> {renderGreetings()} </h1>
        </div>;
    }
}

export default Dashboard;
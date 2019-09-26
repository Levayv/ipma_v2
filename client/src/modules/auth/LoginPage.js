import React from 'react';
import {connect} from 'react-redux';
import {cloneDeep} from 'lodash';


import {
    loginAttempt,
    loginRefresh,
} from '../../redux/action/auth';

import LabeledInput from '../common/LabeledInput';
import Button from '../common/Button';
import Validator from '../common/Validator'
import {createRulesFor} from '../common/Validator'
import VisibleError from "../common/VisibleError";
import history from "../../route/history";


class ConnectedLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /** form control handlers */
            form: {
                data: {
                    /** user input of corresponding fields */
                    credentials: {
                        //todo STOPSHIP for testing purposes , default values must be empty strings
                        login: 'levayv@mail.ru',
                        password: '123456789',
                        // login: '',
                        // password: '',
                    }
                },
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

        };
        /** handle user input according field name */
        this.updateTextInput = (event) => {
            const key = event.target.name;
            const value = event.target.value;
            const currentState = cloneDeep(this.state);

            currentState.form.data.credentials[key] = value;
            currentState.form.validation = this.validator.process({[key]: value}, currentState.form.validation);
            currentState.form.validation.isSubmitEnabled = this.updateButton(currentState.form.validation);

            this.setState(currentState);
        };

        /** todo refactor updateButton , move to Validator object ? */
        this.updateButton = (validationData) => {
            return validationData.login && validationData.password;
        };
        /** user click on LOGIN button */
        this.handleLogin = () => {
            this.props.loginAttempt(this.state.form.data.credentials);    // axios.post(
        };
    }

    componentDidMount() {
        const rules = createRulesFor([
            'login',
            'password',
        ]);

        this.validator = new Validator(rules);

        // todo add popup remove console.log
        let out = "Login Page mounted";
        if(this.props.location.from !== undefined){
            out+=" , Redirected from " + this.props.location.from.pathname
        }
        console.log(out);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("!!! Login page updated")
        if (this.props.session.isReady) {
            if (this.props.session.errors.length === 0) {
                // success
                // todo add popup remove console.log
                console.log("Login success , redirecting to dashboard");
                history.push("/dashboard/")
            } else {
                // failed
                // todo add popup remove console.log
                console.log("Login failed , showing errors")
            }
        } else {
            // fetch in progress or not even started
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LabeledInput
                    name={'login'}
                    displayName={'Login'}
                    placeholder={'YourEmail@mail.xx'}
                    onChange={this.updateTextInput}
                    data={this.state.form.data.credentials}
                    errors={this.state.form.validation.errors}
                />
                <LabeledInput
                    name={'password'}
                    displayName={'Password'}
                    placeholder={'1234'}
                    onChange={this.updateTextInput}
                    data={this.state.form.data.credentials}
                    errors={this.state.form.validation.errors}
                />
                <Button
                    name={'submit'}
                    displayName={'Sign-in'}
                    onClick={this.handleLogin}
                    disabled={!this.state.form.validation.isSubmitEnabled}
                />
                <VisibleError
                    name={this.props.name}
                    errors={this.props.session.errors}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {

    // add selectors...

    return {
        session: state.auth.session,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        loginAttempt: credentials => dispatch(loginAttempt(credentials)),
        loginRefresh: () => dispatch(loginRefresh()),
    };
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPage);
export default LoginPage;
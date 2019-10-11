import React from 'react';
import {connect} from 'react-redux';
import {cloneDeep} from 'lodash';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

import {
    loginAttempt,
} from '../../redux/action/auth';
import Toast from '../../api/Toast'
import LabeledInput from '../common/LabeledInput';
import Button from '../common/Button';
import Validator from '../common/Validator'
import {createRulesFor} from '../common/Validator'
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
                        login: 'A.Mshetsyan@mail.ru',
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
                touched: {
                    login: false,
                    password: false,
                }
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
            currentState.form.touched[key] = true;

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
        // Toast.fire({
        //     type: 'success',
        //     title: 'Signed in successfully'
        // })
        let out = "Login Page mounted";
        if (this.props.location.from !== undefined) {
            out += " , Redirected from " + this.props.location.from.pathname
        }
        console.log(out);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.session.isReady) {
            if (this.props.session.errors.length === 0) {
                Swal.fire({
                    type: 'success',
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                }).then(result => {
                    history.push("/dashboard/")
                });
            } else {
                Swal.fire({
                    type: 'error',
                    title: "Login failed",
                    //todo refactor error structure //
                    text: ("" + this.props.session.errors[0]+" - "+ this.props.session.errors[1]),
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: 'Try again',
                }).then(() => {
                    const currentState = cloneDeep(this.state);
                    currentState.form.validation.errors.login.push("Login and/or password are not correct");
                    currentState.form.validation.errors.password.push("Login and/or password are not correct");
                    this.setState(currentState);
                });
            }
        }
    }

    render() {
        return (
            <Form>
                <LabeledInput
                    name={'login'}
                    displayName={'Login'}
                    placeholder={'YourEmail@mail.xx'}
                    onChange={this.updateTextInput}
                    data={this.state.form.data.credentials}
                    errors={this.state.form.validation.errors}
                    touched={this.state.form.touched}
                />
                <LabeledInput
                    name={'password'}
                    displayName={'Password'}
                    placeholder={'1234'}
                    onChange={this.updateTextInput}
                    data={this.state.form.data.credentials}
                    errors={this.state.form.validation.errors}
                    touched={this.state.form.touched}
                />
                <Button
                    displayName={'Sign-in'}
                    onClick={this.handleLogin}
                    disabled={!this.state.form.validation.isSubmitEnabled}

                    variant={"primary"}
                />
            </Form>
        );
    }
}

const mapStateToProps = state => {

    // todo add selectors...

    return {
        session: state.auth.session,
    }
};

function mapDispatchToProps(dispatch) {
    return {
        loginAttempt: credentials => dispatch(loginAttempt(credentials)),
    };
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(ConnectedLoginPage);
export default LoginPage;
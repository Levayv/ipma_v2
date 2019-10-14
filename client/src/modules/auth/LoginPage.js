import React from 'react';
import {connect} from 'react-redux';
import {cloneDeep} from 'lodash';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

import {
    loginAttempt,
} from '../../redux/action/auth';
// import {toast} from '../../api/alerts';
// import {alert} from '../../api/alerts';
import LabeledInput from '../common/LabeledInput';
import Button from '../common/Button';
import Validator from '../common/Validator';
import {createRulesFor} from '../common/Validator';
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
            const newState = cloneDeep(this.state);

            newState.form.data.credentials[key] = value;
            newState.form.validation = this.validator.process({[key]: value}, newState.form.validation);
            newState.form.touched[key] = true;
            newState.form.validation.isSubmitEnabled = this.updateButton(newState.form);

            this.setState(newState);
        };

        /** todo refactor updateButton , move to Validator object ? */
        this.updateButton = (form) => {
            // validation must be processed with positive results and all form elements must be touched at least once
            return (
                form.validation.login &&
                form.validation.password &&
                form.touched.login &&
                form.touched.password
            );
        };
        /** user click on LOGIN button */
        this.handleLogin = () => {
            const loginAfterStateUpdate = () => {
                this.props.loginAttempt(this.state.form.data.credentials)
            }
            const newState = cloneDeep(this.state);
            newState.form.validation.isSubmitEnabled = false;
            this.setState(newState ,
                loginAfterStateUpdate
            );
        };
    }

    componentDidMount() {
        const rules = createRulesFor([
            'login',
            'password',
        ]);

        this.validator = new Validator(rules);


        // todo add popup remove console.log

        // let out = "Login Page mounted";
        if (this.props.location.from !== undefined) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                type: 'warning',
                title: 'You must be Logged-in to continue'
            }).then(r => {
            });
        } else {
            Swal.fire({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                type: 'info',
                title: 'Welcome'
            }).then(r => {
            });
            // out += " , Redirected from " + this.props.location.from.pathname
        }
        // console.log(out);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("login page componentDidUpdate");
        console.log(this.state);
        if (this.props.session.isReady) {
            if (this.props.session.errors.length === 0) {
                Swal.fire({
                    type: 'success',
                    title: "Login successful",
                    text: "Redirecting to Dashboard",
                    showConfirmButton: false,
                    timer: 1500
                }).then(result => {
                    history.push("/dashboard/")
                });
            } else {
                /** @type string[] Error Bag */
                const errorsArray = this.props.session.errors;
                const errorsLength = this.props.session.errors.length;
                let formattedErrors = errorsArray[0];
                for (let i = 1; i <= errorsLength; i++) {
                    if (errorsArray[i] !== undefined) {
                        formattedErrors.concat(", ", errorsArray[i]);
                    }
                }
                Swal.fire({
                    type: 'error',
                    title: "Login failed",
                    //todo refactor error structure //
                    text: (formattedErrors),
                    showConfirmButton: false,
                    showCancelButton: true,
                    cancelButtonText: 'Try again',
                }).then(() => {
                    const newState = cloneDeep(this.state);
                    newState.form.validation.errors.login.push("Login and/or password are not correct");
                    newState.form.validation.errors.password.push("Login and/or password are not correct");
                    newState.form.touched.login = false;
                    newState.form.touched.password = false;
                    newState.form.validation.isSubmitEnabled = this.updateButton(newState.form);
                    this.setState(newState);
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
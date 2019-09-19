import React, {Component} from "react";
import {connect} from "react-redux";
import {cloneDeep} from "lodash";


import {lessonCreateAttempt} from "../../../redux/action";
import LabeledInput from "../../common/LabeledInput";
import Button from "../../common/Button";
import Validator, {createRulesFor} from "../../common/Validator";

// import LabeledInput from "./components/LabeledInput";
// import FormSubmitButton from "./components/FormSubmitButton";
// import history from "../../../route/history";

class ConnectedLessonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /** form control handlers */
            form: {
                data: {
                    name: "",
                    link: "",
                    topic: "",
                },
                validation: {
                    name: false,
                    link: false,
                    topic: false,
                    isSubmitEnabled: false,
                    errors: {
                        name: [],
                        link: [],
                        topic: [],
                        isSubmitEnabled: [],
                    }
                },
            },
        };


        /** handle user input according to field type */
        // todo consider extracted function to separate file
        this.updateTextInput = (event) => {
            const key = event.target.name;
            const value = event.target.value;
            const currentState = cloneDeep(this.state);
            console.log(key);
            console.log(value);

            currentState.form.data[key] = value;
            currentState.form.validation = this.validator.process(
                {[key]: value},
                cloneDeep(currentState.form.validation)
            );
            currentState.form.validation.isSubmitEnabled = this.updateButton(currentState.form.validation);

            this.setState(cloneDeep(currentState));
        };
        this.updateButton = (validationData) => {
            return validationData.name
                && validationData.link
                && validationData.topic
                ;
        };
        this.handleSubmit = () => {
            this.props.lessonCreateAttempt(this.state.form.data);    // axios.post(
        };

    }
    componentDidMount() {
        const rules = createRulesFor([
            'name',
            'link',
            'topic',
        ]);

        this.validator = new Validator(rules);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.form.validation.errors)
    }

    render() {
        return (
            <div>
                <h1>Form</h1>
                <LabeledInput
                    name={"name"}
                    displayName={"Lesson's name"}
                    placeholder={"Lesson 5 Middleware"}
                    onChange={this.updateTextInput}
                    value={this.state.form.data}
                    errors={this.state.form.validation.errors}
                />
                <LabeledInput
                    name={"link"}
                    displayName={"Lesson's link"}
                    placeholder={"https://laravel.com/docs/master/middleware"}
                    onChange={this.updateTextInput}
                    value={this.state.form.data}
                    errors={this.state.form.validation.errors}
                />
                <LabeledInput
                    name={'topic'}
                    displayName={"Lesson's topic"}
                    placeholder={"Laravel"}
                    onChange={this.updateTextInput}
                    value={this.state.form.data}
                    errors={this.state.form.validation.errors}
                />
                <Button
                    displayName={"Save Lesson"}
                    onClick={this.handleSubmit}
                    disabled={!this.state.form.validation.isSubmitEnabled}
                />
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        lessonCreateAttempt: lesson => dispatch(lessonCreateAttempt(lesson))
    };
}

const LessonForm = connect(null, mapDispatchToProps)(ConnectedLessonForm);
export default LessonForm;
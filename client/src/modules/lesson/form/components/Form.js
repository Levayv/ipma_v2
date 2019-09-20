import React from "react";
import {connect} from "react-redux";
import {cloneDeep} from "lodash";


import {lessonCreateAttempt} from "../../../../redux/action";
import LabeledInput from "../../../common/LabeledInput";
import Button from "../../../common/Button";
import Validator, {createRulesFor} from "../../../common/Validator";

// import LabeledInput from "./components/LabeledInput";
// import FormSubmitButton from "./components/FormSubmitButton";
// import history from "../../../route/history";

class LessonForm extends React.Component {
    constructor(props) {
        super(props);

        // populate state from props if edit

        this.state = {
            /** form control handlers */
            form: {
                data: {
                    id: 0,
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
            // console.log(key);
            // console.log(value);

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
            this.props.handleSubmit(this.state.form.data);    // axios.post(
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
        if (this.props.editData !== undefined) {
            if (this.state.form.data.id !== this.props.editData.id) {
                const newState = cloneDeep(this.state);
                newState.form.data = this.props.editData;

                newState.form.validation.name = true;
                newState.form.validation.link = true;
                newState.form.validation.topic = true;
                newState.form.validation.isSubmitEnabled = true;

                this.updateButton(newState.form.validation);
                this.setState(newState);
            }
        }
    }

    render() {
        console.log("componentDidUpdate old id = " + this.state.form.data.id);
        console.log("componentDidUpdate new id = "
            + ((this.props.editData) ? (this.props.editData.id) : ("none")));

        //todo refactor
        const showButtonName = () => {
            if (this.props.isLoading) {
                return "Saving"
            } else {
                return "Save Lesson"
            }
        };
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
                    displayName={showButtonName()}
                    onClick={this.handleSubmit}
                    disabled={!this.state.form.validation.isSubmitEnabled || this.props.isLoading}
                />
            </div>
        )
    }
}

export default LessonForm;
import React from "react";
import PropTypes from 'prop-types';
import {cloneDeep} from "lodash";

import LabeledInput from "../../../common/LabeledInput";
import Button from "../../../common/Button";
import Validator, {createRulesFor} from "../../../common/Validator";

class LessonForm extends React.Component {
    constructor(props) {
        super(props);
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
        this.updateTextInput = (event) => {
            const key = event.target.name;
            const value = event.target.value;
            const currentState = cloneDeep(this.state);

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
        const getButtonDisplayName = (name) => {
            name = this.props.isLoading
                ? (name + "ing Lesson")
                : (name + " Lesson");
            return name;
        };
        const getHeaderDisplayName = (name) => {
            return (name + " Lesson Form");
        };
        return (
            <div>
                <h1>{getHeaderDisplayName(this.props.displayName)}</h1>
                <LabeledInput
                    name={"name"}
                    displayName={"Lesson's name"}
                    placeholder={"Lesson 5 Middleware"}
                    onChange={this.updateTextInput}
                    data={this.state.form.data}
                    errors={this.state.form.validation.errors}
                />
                <LabeledInput
                    name={"link"}
                    displayName={"Lesson's link"}
                    placeholder={"https://laravel.com/docs/master/middleware"}
                    onChange={this.updateTextInput}
                    data={this.state.form.data}
                    errors={this.state.form.validation.errors}
                />
                <LabeledInput
                    name={'topic'}
                    displayName={"Lesson's topic"}
                    placeholder={"Laravel"}
                    onChange={this.updateTextInput}
                    data={this.state.form.data}
                    errors={this.state.form.validation.errors}
                />
                <Button
                    displayName={getButtonDisplayName(this.props.displayName)}
                    onClick={this.handleSubmit}
                    disabled={!this.state.form.validation.isSubmitEnabled || this.props.isLoading}
                    variant={"success"}
                />
            </div>
        )
    }
}

LessonForm.propTypes = {
    /**
     * Representation of form functionality
     *  either Save or Update
     *
     *  Used inside conditional rendering methods of Form.js
     *
     * */
    displayName: PropTypes.string.isRequired,
    /**
     * function callback
     *
     * 1. change the props.isLoading to true
     * 2. attempt to fetch the resource (post)
     * 3. change the props.isLoading back to false
     *
     * */
    handleSubmit: PropTypes.func,
    /**
     * representation of fetching process
     *
     * */
    isLoading: PropTypes.bool.isRequired,
    /***
     *
     * Edit form must provide data of the Record for updating
     *
     */
    editData: PropTypes.object,
};
export default LessonForm;
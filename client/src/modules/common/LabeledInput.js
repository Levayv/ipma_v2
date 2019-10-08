import React from 'react';
import PropTypes from 'prop-types';
import Form from "react-bootstrap/Form";

import Input from './Input'
import Label from './Label'

/**
 * Combined Label, Input and Possible Errors
 * */
class LabeledInput extends React.Component {
    render() {
        /** One dimensional array of type string extracted Errors from ErrorBag */
        const errors = (this.props.errors)
            ? (this.props.errors[this.props.name])
            : ([]);
        /** Returns ul of errors if any */
        const renderErrors = (errors) => {
            //todo implement debounce
            if (errors.length > 0) {
                const errorList = errors.map((error, index) =>
                    <li key={index}>
                        {error}
                    </li>
                );
                return (
                    <ul>
                        {errorList}
                    </ul>)
            }
        };
        const renderSuccess = () => {
            // todo remove if unnecessary
            return "OK ✓";
        };
        return (
            <Form.Group>
                <Label
                    displayName={this.props.displayName}
                />
                <Input
                    name={this.props.name}
                    value={this.props.data[this.props.name]}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    type="text"
                    isValid={this.props.touched[this.props.name] && (errors.length === 0)}
                    isInvalid={this.props.touched[this.props.name] && (errors.length > 0)}
                />
                <Form.Control.Feedback type="valid">
                    {renderSuccess()}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                    {renderErrors(errors)}
                </Form.Control.Feedback>
            </Form.Group>
        );
    }
}

LabeledInput.propTypes = {
    /**
     * Unique identifier for internal use and <label> , <input> tag id
     * @type string
     * */
    name: PropTypes.string.isRequired,
    /**
     * Rendered inside <label> tag , [OPTIONAL]
     * @type string
     * */
    displayName: PropTypes.string,
    /**
     * Rendered inside <input> tag , [OPTIONAL]
     * @type string
     * */
    placeholder: PropTypes.string,
    /**
     * Handles user input
     * @type string
     * */
    onChange: PropTypes.func.isRequired,
    /**
     * String value extracted from data using this.props.name
     * The result rendered inside <input> tag
     * @type object
     * */
    data: PropTypes.object.isRequired,
    /**
     * ErrorBag for Rendering Validation errors if any [OPTIONAL]
     * String Array extracted from errors using this.props.name
     * @see LabeledInput.propTypes.name
     * @type object
     * */
    errors: PropTypes.object,
    /**
     * ToucheBag , If user ever touched UI element returns true , false otherwise
     * Boolean value is extracted from touched using this.props.name
     * @type boolean
     * */
    touched: PropTypes.object.isRequired,

};

export default LabeledInput;
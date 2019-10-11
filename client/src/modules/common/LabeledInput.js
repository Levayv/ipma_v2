import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input'
import Label from './Label'
import VisibleError from "./VisibleError";

/**
 * Combined Label, Input and Possible Errors
 * */
class LabeledInput extends React.Component {
    render() {
        const getErrors = () => {
            if (this.props.errors)
                return this.props.errors[this.props.name];
            else
                return []
        };
        return (
            <span className={"common-labeled-input"} id={"label-" + this.props.name}>
                <Label
                    displayName={this.props.displayName}
                />
                <Input
                    name={this.props.name}
                    value={this.props.data[this.props.name]}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                />
                <VisibleError
                    errors={getErrors()}
                />
            </span>
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
     * ErrorBag gor Rendering Validation errors if any [OPTIONAL]
     * String Array extracted from errors using this.props.name
     * @see LabeledInput.propTypes.name
     * @type object
     * */
    errors: PropTypes.object,
};

export default LabeledInput;
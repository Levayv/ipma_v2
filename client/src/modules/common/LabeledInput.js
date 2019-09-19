import React from 'react';
import Input from './Input'
import Label from './Label'
import ValidationError from "./ValidationError";

class LabeledInput extends React.Component {
    render() {
        return (
            <div className={"common-labeled-input"}>
                <Label
                    displayName={this.props.displayName}
                />
                <Input
                    name={this.props.name}
                    value={this.props.value[this.props.name]}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                />
                <ValidationError
                    name={this.props.name}
                    errors={this.props.errors[this.props.name]}
                />
                <br/>
            </div>
        );
    }
}

export default LabeledInput;
import React from 'react';
import Input from './Input'
import Label from './Label'

class LabeledInput extends React.Component {
    render() {
        return (
            <div className={"common-labeled-input"}>
                <Label
                    displayName={this.props.displayName}
                />
                <Input
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                />
                <br/>
            </div>

        );
    }
}

export default LabeledInput;
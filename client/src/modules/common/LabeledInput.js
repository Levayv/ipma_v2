import React from 'react';
import Input from './Input'
import Label from './Label'
// import "./LabeledInput.css"

class LabeledInput extends React.Component {
    render() {
        return (
            <div className={"labeled-input"}>
                <Label
                    displayName = {this.props.displayName}
                />
                <Input
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
                <br/>
            </div>

        );
    }
}

export default LabeledInput;
import React from 'react';
// import "./LabeledInput.css"

class Label extends React.Component {
    render() {
        return (
            <div className={"labeled-input"}>
                <label>
                    {this.props.displayName}:
                </label>
            </div>
        );
    }
}

export default Label;
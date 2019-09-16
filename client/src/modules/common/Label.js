import React from 'react';

class Label extends React.Component {
    render() {
        return (
            <label className={"labeled-input"}>
                {this.props.displayName}:
            </label>
        );
    }
}

export default Label;
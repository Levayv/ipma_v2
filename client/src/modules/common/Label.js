import React from 'react';

class Label extends React.Component {
    render() {
        return (
            <label className={"common-label"}>
                {this.props.displayName}
            </label>
        );
    }
}

export default Label;
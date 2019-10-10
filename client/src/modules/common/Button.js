import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className={"common-button"}
                onClick={this.props.onClick}
            >
                {this.props.displayName}
            </button>
        );
    }
}
export default Button;
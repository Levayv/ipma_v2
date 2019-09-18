import React from 'react';

class Button extends React.Component {

    render() {
        return (
            <button
                className={"common-button"}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >
                {this.props.displayName}
            </button>
        );
    }
}

export default Button;
import React from 'react';

class Button extends React.Component {

    render() {
        let className = 'common-button';
        if (this.props.name !== undefined){
            className += ' ' + this.props.name + '-button';
        }
        if (this.props.extraClassName !== undefined){
            className += ' ' + this.props.addToClass;
        }

        return (
            <button
                name={this.props.name}
                className={className}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >
                {this.props.displayName}
            </button>
        );
    }
}

export default Button;
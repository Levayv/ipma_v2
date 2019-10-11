import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <input
                name={this.props.name}
                className={'common-input'}
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
            />
        );
    }
}

export default Input;
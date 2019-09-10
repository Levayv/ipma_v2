import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <input className={"common-input"}
                   value={this.props.value}
                   onChange={this.props.onChange}
                   placeholder={this.props.placeholder}
            />
        );
    }
}

export default Input;
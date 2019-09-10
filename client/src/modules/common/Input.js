import React from 'react';

class Input extends React.Component {
    render() {
        console.log(this.props.placeholder);
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
import React from 'react';
import Form from "react-bootstrap/Form";

class Input extends React.Component {
    render() {
        return (
            <Form.Control
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                type="text"
                isValid={this.props.isValid}
                isInvalid={this.props.isInvalid}
            />
        );
    }
}

export default Input;
import React from 'react';
import Form from "react-bootstrap/Form";

class Label extends React.Component {
    render() {
        return (
            <Form.Label>
                {this.props.displayName}
            </Form.Label>
        );
    }
}

export default Label;
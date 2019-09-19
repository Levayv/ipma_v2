import React from 'react';

class ValidationError extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const errors = this.props.errors;

        let validationConditionalRendering = (errors) => {
            if (errors.length > 0) {
                const errorList = errors.map((error, index) =>
                    <li key={index}>{error}</li>
                );
                return (<span>
                    <ul> {errorList} </ul>
                </span>)
            } else {
                return (<span> ✓ </span>) //todo remove checkmark
            }
        };

        return (
            <span className={"common-validation-error"}>
                {validationConditionalRendering(errors)}
        </span>
        );
    }
}

export default ValidationError;
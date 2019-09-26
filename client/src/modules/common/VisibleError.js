import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders list with array of strings provided by props, if array isn't empty
 * @see errors
 * */
class VisibleError extends React.Component {

    //todo implement debounce

    render() {
        /** @see VisibleError.propTypes.errors */
        const errors = this.props.errors;

        const renderErrors = (errors) => {
            if (errors.length > 0) {
                const errorList = errors.map((error, index) =>
                    <li key={index}>{error}</li>
                );
                return (<ul> {errorList} </ul>)
            }

            // todo remove check mark
            // else {
            //     return (<span> ✓ </span>)
            // }
        };

        return (<span className={"common-error"}> {renderErrors(errors)} </span>);
    }
}

VisibleError.propTypes = {
    /** one dimensional array of type string */
    errors: PropTypes.array.isRequired,
    /** name of the field error occurred */
    name: PropTypes.string,
};
export default VisibleError;
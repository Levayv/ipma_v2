import React from 'react';
import {Button as ButtonUI} from 'react-bootstrap';
import PropTypes from "prop-types";

class Button extends React.Component {

    render() {
        return (
            <ButtonUI
                name={this.props.name}
                onClick={this.props.onClick}
                disabled={this.props.disabled}

                variant={this.props.variant}
                size={this.props.size}
            >
                {this.props.displayName}
            </ButtonUI>
        );
    }
}

Button.propTypes = {
    //todo remove name attribute if still useless
    /**
     * Unique identifier
     * @type string
     * */
    name: PropTypes.string,
    /**
     * Rendered inside <button> tag
     * @type string
     * */
    displayName: PropTypes.string.isRequired,
    /**
     * onclick html native attribute
     * @type function
     * */
    onClick: PropTypes.func,
    /**
     * disabled html native attribute
     * @type boolean
     * */
    disabled: PropTypes.bool,
    /**
     * Bootstrap style
     * @type string
     * @see https://react-bootstrap.github.io/components/buttons/#examples
     * */
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
    ]).isRequired,
    /**
     * Bootstrap style
     * @type string
     * @see https://react-bootstrap.github.io/components/buttons/#sizes
     * */
    size: PropTypes.oneOf([
        'sm',
        'lg',
    ]),

};
export default Button;
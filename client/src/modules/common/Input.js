import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <div className={"input-root"}>
                <input
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default Input;
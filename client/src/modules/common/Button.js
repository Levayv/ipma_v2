import React from 'react';
import {connect} from "react-redux"
import API from "../../api/API";
import history from "../../route/history";

class ConnectedFormSubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.getPayload = () => {
            return {
                name: this.props.values.name,
                link: this.props.values.link,
            }
        };
        this.handleSubmit = (event) =>{
            event.preventDefault();
            if (this.props.recordID){
                if (this.props.action === "edit"){
                    API.doAfterPut("lesson", this.props.recordID , this.getPayload(), this.job);
                }
                if (this.props.action === "delete"){
                    API.doAfterDelete("lesson", this.props.recordID , this.job);
                }
            }else {
                API.doAfterPost("lesson", this.getPayload(), this.job);
            }
        };
        // job is executed inside promise by axios.post|put|delete
        this.job = (isSuccess, data) => {
            try{
                if (isSuccess) {
                    history.push("/lesson/list/")
                }
            }catch (e) {
                debugger
            }
        }
    }

    render() {
        return (
            <button
                className={"button-form"}
                onClick={this.handleSubmit}>
                {this.props.text}
            </button>
        );
    }
}
// useless
const mapStateToProps = state => {
    return {
        // list: state.list,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        // crud_read: singleRecord => dispatch(crud_read(singleRecord))
    };
}
const FormSubmitButton = connect(mapStateToProps, mapDispatchToProps)(ConnectedFormSubmitButton);
export default FormSubmitButton;
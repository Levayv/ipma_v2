import React from "react";
// import {cloneDeep} from 'lodash';
import axios from 'axios';

import Button from "../../../common/Button"
import history from "../../../../route/history";

class LessonItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = () => {
            history.push("/lesson/edit/" + this.props.lesson.id);
        };
        this.handleDelete = () => {
            this.deleteAttempt(this.props.lesson.id);

            // Redirecting to Delete form //todo change to popup
            // history.push("/lesson/delete/"+recordID)
        };
        this.deleteAttempt = (id) => {
            this.setState({deletionInProgress: true});
            axios.delete(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/" + id
            ).then(response => this.deleteSuccess(response)
            ).catch(error => this.deleteFailure(error)
            );
        };
        this.deleteSuccess = (response) => {
            //todo change to popup
            console.log("delete success");
            console.log(response);
            this.setState({deletionInProgress: false});
            this.props.refresh();
        };
        this.deleteFailure = (error) => {
            //todo change to popup
            console.log("delete failed");
            console.log(error);
            this.setState({deleting: false});

        };
    }

    render() {
        const lesson = this.props.lesson;
        return (
            <tr>
                <td className="datum">
                    {this.props.index}
                </td>
                <td className="datum">
                    {lesson.name}
                </td>
                <td className="datum">
                    {lesson.link}
                </td>
                <td>
                    <Button
                        name={"edit"}
                        displayName={"Edit"}
                        extraClassName={"datum"}
                        recordID={lesson.id}
                        onClick={this.handleEdit}
                    />
                    <Button
                        name={"delete"}
                        displayName={"Delete"}
                        extraClassName={"datum"}
                        recordID={lesson.id}
                        onClick={this.handleDelete}
                    />
                </td>
            </tr>
        )
    }
}

export default LessonItem;
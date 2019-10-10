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
            this.setState(
                {
                    lesson: this.props.lesson,
                    deletionInProgress: true,
                },
                // callback after state update
                this.lessonDeleteAttempt
            );

            // this.lessonDeleteAttempt(this.props.lesson.id);

            // Redirecting to Delete form //todo change to popup
            // history.push("/lesson/delete/"+recordID)
        };
        this.lessonDeleteAttempt = () => {
            const lesson = this.state.lesson;
            axios.delete(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/" + lesson.id
            ).then(response => this.deleteSuccess(response)
            ).catch(error => this.deleteFailure(error)
            );
        };
        this.deleteSuccess = (response) => {
            //todo change to popup
            console.log("delete success");
            console.log(response);
            this.setState(
                {
                    deletionInProgress: false
                },
                this.props.refresh
            );
        };
        this.deleteFailure = (error) => {
            //todo change to popup
            console.log("delete failed");
            console.log(error);
            this.setState(
                {deleting: false}
                );
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
                        displayName={"Edit"}
                        recordID={lesson.id}
                        onClick={this.handleEdit}

                        variant={"warning"}
                        size={"sm"}
                    />
                    <Button
                        displayName={"Delete"}
                        recordID={lesson.id}
                        onClick={this.handleDelete}

                        variant={"danger"}
                        size={"sm"}
                    />
                </td>
            </tr>
        )
    }
}

export default LessonItem;
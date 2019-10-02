import React from "react";
import axios from "axios";

import LessonForm from "./components/Form";
import history from "../../../route/history";

class LessonAddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            lesson: {},
            error: "",
        };
        this.handleSubmit = (lesson) => {
            this.setState(
                {
                    loading: true,
                    lesson: lesson,
                },
                // callback after state update
                this.lessonCreateAttempt
            );
        };
        this.lessonCreateAttempt = () => {
            const lesson = this.state.lesson;
            axios.post(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
                {
                    name: lesson.name,
                    link: lesson.link,
                    topic_id: lesson.topic,
                }
            ).then(response => this.lessonCreateFailure(response)
            ).catch(error => this.lessonCreateFailure(error),
            );
        };
        this.lessonCreateSuccess = (/*response see bellow , 5 lines */) => {
            // reason of removal
            // after history push this components state is lost ,
            // redundant to reset state to initial {loading: false, lesson: {} } via setState
            // final polish will be done after popup/alert integration

            //todo add popup , use response message
            history.push("/lesson/list/");
        };
        this.lessonCreateFailure = (error) => {
            //todo add missing implementation of errors , not passing to child inside render() , LessonForm
            this.setState({
                    loading: false,
                    lesson: {},
                    error: error.toString()
                },
                //todo add popup
            )
        };
    }

    render() {
        return (
            <LessonForm
                displayName={"Create"}
                handleSubmit={this.handleSubmit}
                isLoading={this.state.loading}
            />
        )
    }
}

export default LessonAddForm;
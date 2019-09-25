import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {cloneDeep} from "lodash";

import {readSingleLessonAttempt} from "../../../redux/action/lesson";
import LessonForm from "./components/Form"
import history from "../../../route/history";

class ConnectedLessonEditForm extends React.Component {
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
                this.lessonUpdateAttempt
            );
        };
        this.lessonUpdateAttempt = () => {
            const lesson = this.state.lesson;
            axios.put(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/" + lesson.id,
                {
                    name: lesson.name,
                    link: lesson.link,
                    topic_id: lesson.topic,
                }
            ).then(response => this.lessonUpdateSuccess(response)
            ).catch(error => this.lessonUpdateFailure(error),
            );
        };
        this.lessonUpdateSuccess = (/*response see bellow , 5 lines */) => {
            this.setState({
                    loading: false,
                    lesson: {},
                },
                lessonUpdateSuccessRedirect
                //todo add popup , use response message
            );

            function lessonUpdateSuccessRedirect() {
                history.push("/lesson/list/");
            }
        };
        this.lessonUpdateFailure = (error) => {
            this.setState({
                    loading: false,
                    lesson: {},
                    error: error.toString()
                },
                //todo add popup
            )
        };
    }

    componentDidMount() {
        // recordID is provided by Router
        this.props.fetchLesson(this.props.match.params.recordID);
    }

    render() {
        const getLessonDataWhenReady = (lesson) => {
            let data = cloneDeep(lesson.data);
            let error = cloneDeep(lesson.error);
            let ready = cloneDeep(!lesson.loading);
            let success = ((error.length === 0) && (data !== ""));
            if (ready) {
                if (success) {
                    return data
                }
            }
        };
        return (
            <LessonForm
                displayName={"Update"}
                handleSubmit={this.handleSubmit}
                isLoading={this.state.loading}
                editData={getLessonDataWhenReady(this.props.lesson)}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        lesson: state.lesson.single,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchLesson: lesson => dispatch(readSingleLessonAttempt(lesson))
    };
}

const LessonEditForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedLessonEditForm);
export default LessonEditForm;
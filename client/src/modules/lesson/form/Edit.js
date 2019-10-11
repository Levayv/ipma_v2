import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {cloneDeep} from "lodash";

import {readSingleLessonAttempt} from "../../../redux/action/lesson";
import LessonForm from "./components/Form"
import history from "../../../route/history";
import Swal from "sweetalert2";

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
            );

            function lessonUpdateSuccessRedirect() {
                //todo add popup , use response message
                Swal.fire({
                    type: 'success',
                    title: "Lesson updated successfully",
                    showConfirmButton: true,
                    showCancelButton: true,
                    showCloseButton: true,
                    // confirmButtonColor: Color.BLUE,
                    // cancelButtonColor: Color.RED,
                    confirmButtonText: "Back to List",
                    cancelButtonText: "Back to Dashboard",
                }).then(result => {
                        if (result.value) {
                            history.push("/lesson/list/");
                        } else if (
                            result.dismiss === Swal.DismissReason.cancel
                        ) {
                            history.push("/dashboard/")
                        }
                    }
                );
            }
        };
        this.lessonUpdateFailure = (error) => {
            // do nothing , error handling is centralised at initAxios
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
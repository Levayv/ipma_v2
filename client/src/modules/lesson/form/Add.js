import React from "react";
import axios from "axios";
import Swal from 'sweetalert2'

import LessonForm from "./components/Form";
import history from "../../../route/history";

class Color {
    static GREEN = "5df542";
    static RED = "d33";
    static BLUE = "3085d6";
    static GREY = "aaa";
}

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
            ).then(response => this.lessonCreateSuccess(response)
            ).catch(error => this.lessonCreateFailure(error),
            );
        };
        this.lessonCreateSuccess = (/*response see bellow , 5 lines */) => {
            // reason of removal
            // after history push this components state is lost ,
            // redundant to reset state to initial {loading: false, lesson: {} } via setState
            // final polish will be done after popup/alert integration

            //todo add popup , use response message
            Swal.fire({
                type: 'success',
                title: "Lesson created successfully",
                text: "Hint: Press 'esc' or 'X' for creating another lesson",
                showConfirmButton: true,
                showCancelButton: true,
                showCloseButton: true,
                confirmButtonColor: Color.BLUE,
                cancelButtonColor: Color.RED,
                confirmButtonText: "Back to List",
                cancelButtonText: "Back to Dashboard",
            }).then(result => {
                    if (result.value) {
                        history.push("/lesson/list/");
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        history.push("/dashboard/")
                    } else if (
                        //todo bug - cant create several lessons one by one
                        result.dismiss === Swal.DismissReason.backdrop || result.dismiss === Swal.DismissReason.close
                    ) {
                        this.setState({
                            loading: false,
                            lesson: {},
                            error: "",
                        })
                    }
                }
            );
        };
        this.lessonCreateFailure = () => {
            // do nothing , error handling is centralised at initAxios
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
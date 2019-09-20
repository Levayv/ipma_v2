import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {cloneDeep} from "lodash";

import {readSingleLessonAttempt} from "../../../redux/action";
import LessonForm from "./components/Form"
import history from "../../../route/history";
import LessonTable from "../list/components/LessonTable";
import Button from "../../common/Button";

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
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson/"+lesson.id,
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
        console.log("EDIT ...");
        console.log("ID = " + this.props.match.params.recordID);
        this.props.fetchLesson(this.props.match.params.recordID);

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let data = cloneDeep(this.props.lesson.data);
        let error = cloneDeep(this.props.lesson.error);
        let ready = cloneDeep(! this.props.lesson.loading);
        let success = (error.length === 0);
        let giveLessonEditingDataWhenReady = () => {
            if (ready) {
                if (success) {
                    return this.props.lesson.data
                } else {
                    return undefined
                }
            } else {
                return undefined
            }
        };
        return (
            <LessonForm
                handleSubmit={this.handleSubmit}
                isLoading={this.state.loading}
                editData={giveLessonEditingDataWhenReady()}
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
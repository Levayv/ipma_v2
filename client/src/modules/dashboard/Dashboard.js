import React from "react";
import axios from "axios";
import history from "../../route/history";

// import LessonForm from "./components/Form";
// import history from "../../../route/history";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // loading: false,
            // user: {},
            // error: "",
        };
        // this.handleSubmit = (lesson) => {
        //     this.setState(
        //         {
        //             loading: true,
        //             lesson: lesson,
        //         },
        //         // callback after state update
        //         this.lessonCreateAttempt
        //     );
        // };
        // this.lessonCreateAttempt = () => {
        //     const lesson = this.state.lesson;
        //     axios.post(
        //         "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
        //         {
        //             name: lesson.name,
        //             link: lesson.link,
        //             topic_id: lesson.topic,
        //         }
        //     ).then(response => this.lessonCreateSuccess(response)
        //     ).catch(error => this.lessonCreateFailure(error),
        //     );
        // };
        // this.lessonCreateSuccess = (/*response see bellow , 5 lines */) => {
        //     this.setState({
        //             loading: false,
        //             lesson: {},
        //         },
        //         lessonCreateSuccessRedirect
        //         //todo add popup , use response message
        //     );
        //
        //     function lessonCreateSuccessRedirect() {
        //         history.push("/lesson/list/");
        //     }
        // };
        // this.lessonCreateFailure = (error) => {
        //     this.setState({
        //             loading: false,
        //             lesson: {},
        //             error: error.toString()
        //         },
        //         //todo add popup
        //     )
        // };
        this.getCurrentUserAttempt = () => {
            // const lesson = this.state.lesson;
            axios.get(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/auth/me",
            ).then(response => this.getCurrentUserSuccess(response)
            ).catch(error => this.getCurrentUserFailure(error)
            );
        };
        this.getCurrentUserSuccess = (/*response see bellow , 5 lines */) => {
            this.setState({
                    loading: false,
                    lesson: {},
                },
                lessonCreateSuccessAction
                //todo add popup , use response message
            );

            function lessonCreateSuccessAction() {
                console.log("Verify User success")
                // history.push("/lesson/list/");
            }
        };
        this.getCurrentUserFailure = (error) => {
            this.setState({
                    loading: false,
                    lesson: {},
                    error: error.toString()
                },
                //todo add popup
            )
            console.log("Verify User success")

        };
    }

    componentDidMount() {
        this.setState({
                loading: false,
                user: {},
                error: "",
            },this.getCurrentUserAttempt
        )
    }

    render() {
        return <h1>Welcome to Dashboard</h1>;

        // return (
        //     <LessonForm
        //         displayName={"Create"}
        //         handleSubmit={this.handleSubmit}
        //         isLoading={this.state.loading}
        //     />
        // )
    }
}

export default Dashboard;
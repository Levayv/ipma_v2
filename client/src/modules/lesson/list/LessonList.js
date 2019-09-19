import React from "react";
import {connect} from "react-redux";
import axios from "axios";
import {cloneDeep} from 'lodash';

import LessonTable from "./components/LessonTable"

class ConnectedLessonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {
                ready: false,
                success: false,
                data: {},
                error: "!",
            }
        };
        this.fetchAttempt = () => {
            axios.get(
                "http://" + process.env.REACT_APP_BACKEND_IP_PORT + "/api/lesson",
            ).then(response => this.fetchSuccess(response)
            ).catch(error => this.fetchFailure(error)
            );
        };
        this.fetchSuccess = (response) => {
            let newState = cloneDeep(this.state);
            newState.result.data = {}; // todo research
            newState.result.data = response.data;
            newState.result.ready = true;
            newState.result.success = true;
            this.setState(newState);
        };
        this.fetchFailure = (error) => {
            let newState = cloneDeep(this.state);
            newState.result.ready = true;
            newState.result.success = false;
            newState.result.error = error.toString();
            this.setState(newState);
        };
    }

    componentDidMount() {
        //todo add refresh button
        this.fetchAttempt();
    }

    render() {
        const showLessonsWhenReady = () => {
            if (this.state.result.ready) {
                if (this.state.result.success){
                    return <LessonTable dataList={this.state.result.data}/>
                }else {
                    return <span>
                        <h2> Something went wrong </h2>
                        <h4> {this.state.result.error} </h4>
                    </span>
                }
            } else {
                return <span> loading </span>
            }
        };

        return (<div>
                {showLessonsWhenReady()}
            </div>
        );
    }
}

// todo get UserName and Role from Redux Store
// const mapStateToProps = state => {
//     return {
//         // userName: state.user.name
//         // role: state.user.role
//     };
// };

const LessonList = connect(/*mapStateToProps, mapDispatchToProps*/)(ConnectedLessonList);
export default LessonList;
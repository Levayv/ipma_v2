import React from "react";
import {connect} from "react-redux";
import {cloneDeep} from 'lodash';

import LessonTable from "./components/LessonTable"
import Button from "../../common/Button";
import {readBulkLessonAttempt} from '../../../redux/action/lesson';

class ConnectedLessonList extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = () => {
            this.props.fetchLessons();
        };
    }

    componentDidMount() {
        this.refresh();
    }

    render() {
        let data = cloneDeep(this.props.lessons.data);
        let error = cloneDeep(this.props.lessons.error);
        let ready = cloneDeep(! this.props.lessons.loading);
        let success = (error.length === 0);

        let showLessonsWhenReady = () => {
            if (ready) {
                if (success) {
                    return (
                        <LessonTable
                            dataList={data}
                            refresh={this.refresh}
                        />
                    )
                } else {
                    return <span>
                        <h2> Something went wrong </h2>
                        <h4> {error} </h4>
                    </span>
                }
            } else {
                return <span> loading </span>
            }
        };
        let showRefreshButton = () => {
            return (
                <Button
                    name={"refresh"}
                    displayName={"Refresh"}
                    onClick={this.refresh}
                />
            )
        };
        return (<div>
                {showRefreshButton()}
                {showLessonsWhenReady()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lessons: state.lesson.bulk,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchLessons: lesson => dispatch(readBulkLessonAttempt(lesson))
    };
}

const LessonList = connect(mapStateToProps, mapDispatchToProps)(ConnectedLessonList);
export default LessonList;
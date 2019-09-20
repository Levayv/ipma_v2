import React from "react";
import {connect} from "react-redux";
import {cloneDeep} from 'lodash';

import LessonTable from "./components/LessonTable"
import Button from "../../common/Button";
import {lessonReadBulkAttempt} from '../../../redux/action';

class ConnectedLessonList extends React.Component {
    constructor(props) {
        super(props);
        this.refresh = () => {
            this.props.lessonReadBulkAttempt();
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

// todo get UserName and Role from Redux Store
// const mapStateToProps = state => {
//     return {
//         // userName: state.user.name
//         // role: state.user.role
//     };
// };

const mapStateToProps = state => {
    return {
        lessons: state.lessons,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        lessonReadBulkAttempt: lesson => dispatch(lessonReadBulkAttempt(lesson))
    };
}

const LessonList = connect(mapStateToProps, mapDispatchToProps)(ConnectedLessonList);
export default LessonList;
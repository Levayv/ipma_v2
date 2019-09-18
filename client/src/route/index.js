import React, {Component} from "react";
import {
    Router,
    Route,
    Link,
    // Redirect,
} from "react-router-dom";

import history from "./history";
import LoginPage from "../modules/auth";
import LessonForm from "../modules/lesson/form/LessonForm";

// import LessonList from "./modules/lesson/list/LessonList";
// import LessonDelete from "./modules/lesson/form/LessonDelete";

import initialize from "../config/init";

class AppRouter extends Component {
    constructor(props) {
        super(props);
        initialize();
    }

    render() {
        // todo research and use Refs instead of direct DOM manipulation
        // todo refactor (id for getElementByID) >> (ref)
        return (
            <Router history={history}>
                <div className={"router-root"}>
                    <nav className={"router-nav-main"}>
                        <hr/>
                        <ul>
                            <li id={"router-nav-dashboard"}><Link to="/">
                                Dashboard
                            </Link></li>
                            <li id={"router-nav-login"}><Link to="/auth/login">
                                Login
                            </Link></li>
                            <li id={"router-nav-list"}><Link to="/lesson/list">
                                List
                            </Link></li>
                            <li id={"router-nav-form"}><Link to="/lesson/form">
                                Form
                            </Link></li>
                            <li id={"router-nav-edit"}><Link to="/lesson/edit">
                                Edit
                            </Link></li>
                        </ul>
                        <hr/>
                    </nav>

                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/lesson" component={Lesson}/>
                </div>
            </Router>
        );
    }
}

function Dashboard() {
    return <h2 style={{
        width: "80%",
        margin: "auto",
        textAlign: "center"
    }}>Dashboard</h2>;
}
function Auth({match}) {
    return (<div>
        <Route exact path={`${match.path}/login`} component={LoginPage}/>
    </div>)
}
function Lesson({match}) {
    return (<div>
        <Route exact path={`${match.path}/form/`} component={LessonForm}/>
        {/*<Route exact path={`${match.path}/list/`} component={LessonList}/>*/}
        {/*<Route exact path={`${match.path}/edit/`}*/}
        {/*       render={() => {*/}
        {/*           alert("Please use edit button inside List of Lessons");*/}
        {/*           // history.push("/lesson/list")*/}
        {/*           return (<Redirect to={{pathname: "/lesson/list",}}/>)*/}
        {/*       }}/>*/}
        {/*<Route path={`${match.path}/edit/:recordID`} component={LessonForm}/>*/}
        {/*<Route path={`${match.path}/delete/:recordID`} component={LessonDelete}/>*/}
    </div>)
}

export default AppRouter;
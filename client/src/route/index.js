import React, {Component} from "react";
import {
    Router,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

import history from "./history";
import LoginPage from "../modules/auth";
import LessonAddForm from "../modules/lesson/form/Add";
import LessonEditForm from "../modules/lesson/form/Edit";
import LessonList from "../modules/lesson/list/LessonList";
import {loadTokenFromLocalStorage} from "../api/mapStoreToLocal";

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

        const renderAvailableMenus = () => {
            return (
                <ul>
                    <li id={"router-nav-home"} className={"router-nav-item"}>
                        <Link to="/">HomePage</Link>
                    </li>
                    <li id={"router-nav-login"} className={"router-nav-item"}>
                        <Link to="/auth/login">Login</Link>
                    </li>
                    <li id={"router-nav-dashboard"} className={"router-nav-item"}>
                        <Link to="/Dashboard">Dashboard</Link>
                    </li>
                    <li id={"router-nav-list"} className={"router-nav-item"}>
                        <Link to="/lesson/list">List</Link>
                    </li>
                    <li id={"router-nav-form"} className={"router-nav-item"}>
                        <Link to="/lesson/form">Form</Link>
                    </li>
                </ul>
            )
        };
        return (
            <Router history={history}>
                <div className={"router-root"}>
                    <nav className={"router-nav-main"}>
                        {renderAvailableMenus()}
                    </nav>


                    <Route path="/" exact component={HomePage}/>
                    <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/lesson"
                           component={Lesson}
                           role={this.state.user}
                    />
                </div>
            </Router>
        );
    }
}

function HomePage() {
    return <h1> Welcome to Home Page </h1>;
}

function Dashboard() {
    return <h1>Welcome to Dashboard</h1>;
}

function Auth({match}) {
    return (<div>
        <Route exact path={`${match.path}/login`} component={LoginPage}/>
    </div>)
}

function Lesson({match}) {
    return (<div>
        <Route exact path={`${match.path}/list/`} component={LessonList}/>
        <Route exact path={`${match.path}/form/`} component={LessonAddForm}/>
        <Route path={`${match.path}/edit/:recordID`} component={LessonEditForm}/>
    </div>)
}

const PrivateRoute = ({component: Component, ...restOfProps}) => {
    return (
        <Route
            {...restOfProps}
            render={
                props =>
                    (loadTokenFromLocalStorage())
                        ? (<Component {...props}/>)
                        : (<Redirect to={{
                            pathname: "/auth/login",
                            state: {
                                from: props.location
                            }
                        }}/>)
            }
        />
    )
};

export default AppRouter;
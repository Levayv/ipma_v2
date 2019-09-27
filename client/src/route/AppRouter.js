import React, {Component} from "react";
import {
    Router,
    Route,
    Switch,
    NavLink,
    Redirect,
} from "react-router-dom";

import history from "./history";
import LoginPage from "../modules/auth/LoginPage";
import LessonAddForm from "../modules/lesson/form/Add";
import Dashboard from "../modules/dashboard/Dashboard";
import LessonEditForm from "../modules/lesson/form/Edit";
import LessonList from "../modules/lesson/list/LessonList";
import {loadTokenFromLocalStorage} from "../api/mapStoreToLocal";

import initialize from "../config/init";

class AppRouter extends Component {
    constructor(props) {
        super(props);
        initialize();
    }

    render() {
        // todo research and use Refs instead of direct DOM manipulation
        // todo refactor (id for getElementByID) >> (ref)

        const renderAvailableLinks = () => {
            // todo remove temp solution (activeStyle)
            return (
                <nav className={"router-nav-menu"}>
                    <ul>
                        <li id={"router-nav-home"} className={"router-nav-item"}>
                            <NavLink
                                activeClassName="router-nav-link-selected"
                                to="/home"
                                activeStyle={{fontWeight: "bold", color: "blue"}}
                            >
                                HomePage
                            </NavLink>
                        </li>
                        <li id={"router-nav-login"} className={"router-nav-item"}>
                            <NavLink
                                activeClassName="router-nav-link-selected"
                                to="/auth/login"
                                activeStyle={{fontWeight: "bold", color: "blue"}}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li id={"router-nav-dashboard"} className={"router-nav-item"}>
                            <NavLink
                                activeClassName="router-nav-link-selected"
                                to="/dashboard"
                                activeStyle={{fontWeight: "bold", color: "blue"}}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li id={"router-nav-list"} className={"router-nav-item"}>
                            <NavLink
                                activeClassName="router-nav-link-selected"
                                to="/lesson/list"
                                activeStyle={{fontWeight: "bold", color: "blue"}}
                            >
                                List
                            </NavLink>
                        </li>
                        <li id={"router-nav-form"} className={"router-nav-item"}>
                            <NavLink
                                activeClassName="router-nav-link-selected"
                                to="/lesson/form"
                                activeStyle={{fontWeight: "bold", color: "blue"}}
                            >
                                Form
                            </NavLink>
                        </li>
                    </ul>
                </nav>


            )
        };
        const renderAvailableRoutes = () => {
            return (
                <div className={"router-routes"}>
                    <Switch>
                        <Route path="/" exact component={RedirectToHomePage}/>
                        <Route path="/home" exact component={HomePage}/>
                        <Route path="/auth" component={Auth}/>
                        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                        <PrivateRoute path="/lesson"
                                      component={Lesson}
                        />
                        <Route component={PageNotFound}/>
                    </Switch>
                </div>
            )
        };
        return (
            <Router history={history}>
                <div className={"router-root"}>
                    {renderAvailableLinks()}
                    {renderAvailableRoutes()}
                </div>
            </Router>
        );
    }
}

function PageNotFound({location}) {
    return (
        <span>
            <h1> Error 404 </h1>
            <h2> Page "<code>{location.pathname.substr(1)}</code>" not found </h2>
        </span>
    )
}

function RedirectToHomePage() {
    return <Redirect to={{pathname: "/home"}}/>;
}

function HomePage() {
    return <h1> Welcome to Home Page </h1>;
}

function Auth({match}) {
    return (<Switch>
        <Route exact path={`${match.path}/login`} component={LoginPage}/>
        <Route component={PageNotFound}/>
    </Switch>)
}

function Lesson({match}) {
    return (<Switch>
        <Route exact path={`${match.path}/list/`} component={LessonList}/>
        <Route exact path={`${match.path}/form/`} component={LessonAddForm}/>
        <Route path={`${match.path}/edit/:recordID`} component={LessonEditForm}/>
        <Route component={PageNotFound}/>
    </Switch>)
}

const PrivateRoute = ({component: Component, ...restOfProps}) => {
    return (
        <Switch>
            <Route
                {...restOfProps}
                render={
                    props =>
                        (loadTokenFromLocalStorage())
                            ? (<Component {...props}/>)
                            : (<Redirect to={{
                                pathname: "/auth/login",
                                from: props.location
                            }}/>)
                }
            />
            <Route component={PageNotFound}/>
        </Switch>
    )
};

export default AppRouter;
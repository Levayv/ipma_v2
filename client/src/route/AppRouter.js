import React, {Component} from "react";
import {
    Router,
    Route,
    Switch,
    NavLink,
    Redirect,
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import history from "./history";
import LoginPage from "../modules/auth/LoginPage";
import LessonAddForm from "../modules/lesson/form/Add";
import Dashboard from "../modules/dashboard/Dashboard";
import LessonEditForm from "../modules/lesson/form/Edit";
import LessonList from "../modules/lesson/list/LessonList";
import {loadTokenFromLocalStorage} from "../api/mapStoreToLocal";
import initialize from "../config/init";

import './AppRouter.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


class AppRouter extends Component {
    // todo extract links and routes by layout
    //  * research bootstrap
    constructor(props) {
        super(props);
        initialize();
    }

    render() {
        const renderNavigation = () => {
            // todo remove temp solution (activeStyle)
            return (
                <Navbar
                    className={'router-nav-menu'}
                    expand='true'
                >
                    <Navbar.Toggle aria-controls="main-navbar-root"/>
                    <Navbar.Collapse id="main-navbar-root">
                        <Nav className="mr-auto">
                            <Nav.Link
                                as={NavLink}
                                to="/home"
                                activeStyle={{fontWeight: "bold", color: "black"}}
                            >
                                HomePage
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/auth/login"
                                activeStyle={{fontWeight: "bold", color: "black"}}
                            >
                                Login
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/dashboard"
                                activeStyle={{fontWeight: "bold", color: "black"}}
                            >
                                Dashboard
                            </Nav.Link>
                            <NavDropdown title="Lesson" id="lesson-nav-dropdown">
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/lesson/list"
                                    activeStyle={{fontWeight: "bold", color: "black"}}
                                >
                                    List
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/lesson/form"
                                    activeStyle={{fontWeight: "bold", color: "black"}}
                                >
                                    Form
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        };
        const renderRoutes = () => {
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
        const renderHeader = () => {
            return (
                <div>
                    Some fancy name goes here
                </div>
            )
        };
        const renderFooter = () => {
            return (
                <div>
                    <div> Footer</div>
                    <div> Something useful must be rendered here</div>
                </div>
            )
        };
        return (
            <Router history={history}>
                <div className={"router-root"}>
                    <Container>
                        <Row>
                            <Col xs={12} sm={4} md={3} lg={2} className={"aside-root"}>
                                <Row className={'aside-body'}>
                                    {renderNavigation()}
                                </Row>
                            </Col>
                            <Col xs={12} sm={8} md={9} lg={10} className={"main-root"}>
                                <Row>
                                    <Col className={"main-header"}>
                                        {renderHeader()}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={"main-body"}>
                                        {renderRoutes()}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className={"main-footer"}>
                                        {renderFooter()}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>

                    {/*{renderAvailableLinks()}*/}
                    {/*{renderAvailableRoutes()}*/}
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
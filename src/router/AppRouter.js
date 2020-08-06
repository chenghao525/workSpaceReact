// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CertificationBox from "../components/CertificationBox";
import NewTrackCE from "../pages/NewTrackCE"
import WelcomeAboardPage from "../WelcomeAboardPage"
import AdminCEManagement from "../pages/AdminCeManagement"

export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/AdminCeManagement" />)} />
        <Route path="/CertificationBox" component={CertificationBox} />
        <Route path="/NewTrackCE" component={NewTrackCE} />
        <Route path="/WelcomePage" component={WelcomeAboardPage} />
        <Route path="/AdminCeManagement" component={AdminCEManagement} />
      </Switch>
    )
  }
} 
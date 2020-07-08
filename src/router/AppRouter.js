// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CertificationBox from "../components/CertificationBox";
import NewTrackCE from "../pages/NewTrackCE"
import WelcomeAboardPage from "../WelcomeAboardPage"

export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/WelcomePage" />)} />
        <Route path="/CertificationBox" component={CertificationBox} />
        <Route path="/NewTrackCE" component={NewTrackCE} />
        <Route path="/WelcomePage" component={WelcomeAboardPage} />
      </Switch>
    )
  }
} 
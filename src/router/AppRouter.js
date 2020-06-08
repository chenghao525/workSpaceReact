// src/router/router.js
import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import CertificationBox from "../components/CertificationBox";
import NewTrackCE from "../pages/NewTrackCE"

export default class AppRouter extends Component {
  render() {
    return(
      <Switch>
        <Route path="/" exact render={() => (<Redirect to="/CertificationBox" />)} />
        <Route path="/CertificationBox" component={CertificationBox} />
        <Route path="/NewTrackCE" component={NewTrackCE} />
      </Switch>
    )
  }
} 
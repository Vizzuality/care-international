import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import AppWrapper from "components/AppWrapper";

class Routes extends React.Component {

  render() {
    return (<Router>
      <Switch>
        <Redirect exact from="/" to="/2016/reach/countries" />
        <Redirect exact from="/:year" to="/:year/reach/countries" />
        <Redirect exact from="/:year/reach" to="/:year/reach/countries" />
        <Redirect exact from="/reach/countries" to="/2016/reach/countries" />

        <Route exact path="/:year/reach/countries/:country?" component={(props) => <AppWrapper mainView="reach" subView="countries" {...props} />} />
        <Route exact path="/:year/reach/regions/:region?" component={(props) => <AppWrapper mainView="reach" subView="regions" {...props} />} />
        <Route exact path="/impact/story/:story" component={(props) => <AppWrapper mainView="impact" {...props} />} />
        <Route exact path="/impact/:region?/:country?" component={(props) => <AppWrapper mainView="impact" {...props} />} />

        <Route exact path="*" component={(props) => <AppWrapper mainView="notfound" {...props} />} />
      </Switch>
    </Router>);
  }

}

export default Routes;

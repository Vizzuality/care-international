import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import AppWrapper from "components/AppWrapper";

class Routes extends React.Component {

  render() {
    const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? '/care-international' : '';

    return (<Router>
      <Switch>
        <Redirect exact from={`${prefix}/`} to={`${prefix}/2016/reach/countries`} />
        <Redirect exact from={`${prefix}/reach`} to={`${prefix}/2016/reach/countries`} />
        <Redirect exact from={`${prefix}/countries`} to={`${prefix}/2016/reach/countries`} />

        <Route exact path={`${prefix}/:year/reach/countries`} component={(props) => <AppWrapper mainView="reach" subView="countries" {...props} />} />
        <Route exact path={`${prefix}/:year/reach/countries/:country?`} component={(props) => <AppWrapper mainView="reach" subView="countries" {...props} />} />
        <Route exact path={`${prefix}/:year/reach/regions`} component={(props) => <AppWrapper mainView="reach" subView="regions" {...props} />} />
        <Route exact path={`${prefix}/:year/reach/regions/:region?`} component={(props) => <AppWrapper mainView="reach" subView="regions" {...props} />} />
        <Route exact path={`${prefix}/impact/story/:story`} component={(props) => <AppWrapper mainView="impact" {...props} />} />
        <Route exact path={`${prefix}/impact/:region?/:country?`} component={(props) => <AppWrapper mainView="impact" {...props} />} />

        <Route exact path="*" component={(props) => <AppWrapper mainView="notfound" {...props} />} />
      </Switch>
    </Router>);
  }

}

export default Routes;

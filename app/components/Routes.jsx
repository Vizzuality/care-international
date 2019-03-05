import React from "react";
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { setKey } from "lib/storage";

import AppWrapper from "components/AppWrapper";

class Routes extends React.Component {

  render() {
    const isGHPages = window.location.href.includes('vizzuality.github.io');
    const Router = isGHPages ? HashRouter : BrowserRouter;

    // Enabling modal when user go using origin URL
    const originUrls = [
      'http://localhost:8080',
      'https://vizzuality.github.io/care-international',
      'https://impact.care-international.org'
    ];
    const matchOriginUrl = originUrls.find(o => (o === location.href || `${o}/` === location.href));
    if (matchOriginUrl) setKey("about-dismissed", false);

    return (<Router>
      <Switch>
        {isGHPages && (<Redirect exact from="/care-international" to="/2018/reach/countries" />)}
        <Redirect exact from="/" to="/2018/reach/countries" />
        <Redirect exact from="/reach" to="/2018/reach/countries" />
        <Redirect exact from="/countries" to="/2018/reach/countries" />

        <Route exact path="/:year/reach/countries" component={(props) => <AppWrapper mainView="reach" subView="countries" {...props} />} />
        <Route exact path="/:year/reach/countries/:country?" component={(props) => <AppWrapper mainView="reach" subView="countries" {...props} />} />
        <Route exact path="/:year/reach/regions" component={(props) => <AppWrapper mainView="reach" subView="regions" {...props} />} />
        <Route exact path="/:year/reach/regions/:region?" component={(props) => <AppWrapper mainView="reach" subView="regions" {...props} />} />
        <Route exact path="/impact/story/:story" component={(props) => <AppWrapper mainView="impact" {...props} />} />
        <Route exact path="impact/:region?/:country" component={(props) => <AppWrapper mainView="impact" {...props} />} />

        <Route exact path="*" component={(props) => <AppWrapper mainView="notfound" {...props} />} />
      </Switch>
    </Router>);
  }

}

export default Routes;

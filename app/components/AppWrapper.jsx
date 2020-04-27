import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

import DataProvider from "components/providers/Data";
import App from "components/App";

class AppWrapper extends React.Component {

  static contextTypes =  {
    router: PropTypes.object.isRequired,
  };

  render() {
    let { mainView, subView, match } = this.props;
    let { router } = this.context;

    let qs = queryString.parse(router.route.location.search);

    let navigation = {
      mainView: mainView,
      subView: subView,
      year: match.params.year && decodeURIComponent(match.params.year),
      country: match.params.country && decodeURIComponent(match.params.country),
      region: match.params.region && decodeURIComponent(match.params.region),
      story: match.params.story && decodeURIComponent(match.params.story),
      program: qs.program,
    };

    return (
    <DataProvider>
      <App navigation={navigation} />
    </DataProvider>);
  }

};

export default AppWrapper;

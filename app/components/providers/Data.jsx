import React from "react";
import PropTypes from "prop-types";

import { fetchGlobalData, getLastYear } from "lib/remote";

class DataProvider extends React.Component {

  static childContextTypes = {
    data: PropTypes.shape({
      texts: PropTypes.object.isRequired,
      stories: PropTypes.array.isRequired,
    }).isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      loading: true,
      data: {
        texts: {},
        stories: [],
        year: "",
      },
    };
  }

  getChildContext() {
    return {
      data: this.state.data,
    };
  }

  componentWillMount() {
    getLastYear().then(year =>
    fetchGlobalData(year)
      .then(([texts, stories, storiesByCountry]) => {
        this.setState({
          data: {
            texts,
            stories,
            storiesByCountry,
            year,
          },
          loading: false,
        });
      })
    );
  }

  render() {
    if (this.state.loading) return null;

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, { year: this.state.data.year })
    );

    return <div>{children}</div>;
  }

}

export default DataProvider;

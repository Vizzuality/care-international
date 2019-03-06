import React from "react";
import PropTypes from "prop-types";

import Layout from "components/Layout";

import navigationProps from "props/navigation";
import getLocation from "lib/location";
import { setKey, getKey } from "lib/storage";
import { fetchReachData, fetchImpactData } from "lib/remote";

import { logEvent } from "utils/analytics";

class App extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object,
  }

  static propTypes = {
    navigation: navigationProps,
  };

  static defaultProps = {
    program: "overall",
  }

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      data: {
        statistics: {},
        bounds: null,
      },
      modal: !getKey("about-dismissed") ? "about" : null,
    };
  }

  navigate(options) {
    let location = getLocation(options);
    this.context.router.history.push(location);
  }

  handleProgramChange(program, year) {
    this.navigate({
      mainView: this.props.navigation.mainView,
      subView: this.props.navigation.subView,
      year: year || this.props.navigation.year,
      region: this.props.navigation.region,
      country: this.props.navigation.mainView === "impact" ?
        this.props.navigation.region && this.props.navigation.country :
        this.props.navigation.country,
      program: program,
    });
    if (this.props.navigation.mainView === "reach") {
      (this.props.navigation.program) ?
      logEvent('Reach', 'year: ' + this.props.navigation.year, 'program: ' + this.props.navigation.program) :
      logEvent('Reach', 'year: ' + this.props.navigation.year, 'overall')
    }
    if (this.props.navigation.mainView === "impact") {
      (this.props.navigation.region) ?
      logEvent('Impact area: ' + this.props.navigation.region, 'program: ' + this.props.navigation.program) :
      logEvent('Impact trough years', 'Program: ', this.props.navigation.program )
    }
  }

  handleMapChange(region, country, year) {
    this.navigate({
      mainView: this.props.navigation.mainView,
      subView: this.props.navigation.subView,
      year: year || this.props.navigation.year,
      region: region || this.props.navigation.region,
      country: country || this.props.navigation.country,
      program: this.props.navigation.program,
    });
  }

  handleCloseStory() {
    this.navigate({
      mainView: "impact",
      program: this.props.navigation.program,
    });
  }

  handleToggleModal(modal) {
    let previouslyActiveModal = this.state.modal;
    this.setState({
      modal: modal,
    }, () => {
      // persist dismissal of about modal
      if (!this.state.modal && previouslyActiveModal === "about") {
        setKey("about-dismissed", true);
      }
    });
  }

  fetchRemoteData() {
    let { navigation } = this.props;

    switch (navigation.mainView) {
      case "reach":
        fetchReachData(navigation.region, navigation.country, navigation.year)
          .then(([statistics, bounds]) => {
            this.setState({
              loading: false,
              data: {
                statistics: statistics,
                bounds: bounds,
              },
            }
);
          });

        break;

      case "impact":
        fetchImpactData(navigation.region, navigation.country)
          .then(([statistics, regions, bounds]) => {
            this.setState({
              loading: false,
              data: {
                statistics: statistics,
                regions: regions,
                bounds: bounds,
              },
            });
          });
        break;
    }
  }

  componentDidMount() {
    this.fetchRemoteData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchRemoteData();
    }
  }

  render() {
    let handlers = {
      handleProgramChange: (program) => this.handleProgramChange(program),
      handleMapChange: (region, country, year) => this.handleMapChange(region, country, year),
      handleCloseStory: () => this.handleCloseStory(),
      handleToggleModal: (modal) => this.handleToggleModal(modal),
    };

    return (<Layout
      loading={this.state.loading}
      navigation={this.props.navigation}
      modal={this.state.modal}
      data={this.state.data}
      handlers={handlers}
      router={this.context.router}
    />);
  }

}

export default App;

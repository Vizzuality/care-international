import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./style.scss";

class ValueBar extends React.Component {

  static propTypes = {
    colorClass: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
  };

  render() {

    let widthValue;

    if (0 < this.props.value && this.props.value <= 1.000) {
      widthValue = 16;
    }
    else if (1.000 < this.props.value && this.props.value <= 5.000) {
      widthValue = 32;
    }
    else if (5.000 < this.props.value && this.props.value <= 10.000) {
      widthValue = 48;
    }
    else if (10.000 < this.props.value && this.props.value <= 20.000) {
      widthValue = 64;
    }
    else if (20.000 < this.props.value && this.props.value <= 50.000) {
      widthValue = 80;
    }
    else if (50000 < this.props.value && this.props.value <= 100000) {
      widthValue = 96;
    }
    else if (100000 < this.props.value && this.props.value <= 500000) {
      widthValue = 112;
    }
    else if (500000 < this.props.value && this.props.value <= 1000000) {
      widthValue = 128;
    }
    else if (1000000 < this.props.value && this.props.value <= 10000000) {
      widthValue = 144;
    }
    else if (10000000 < this.props.value && this.props.value <= 50000000) {
      widthValue = 160;
    }
    else {
      widthValue = 176;
    }

    let styles = {
      current: {
        width: widthValue + "px",
      },
    };
    let barClasses = classNames(["valuebar", this.props.colorClass]);

    return (<div className="valuebar__container">
      <span className={barClasses}>
        <span className="valuebar__current" style={styles.current} />
      </span>
      {this.props.children}
    </div>);
  }

}

export default ValueBar;

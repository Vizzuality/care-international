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

    const value = this.props.value;
    const ranges = [0, 1000, 5000, 10000, 20000, 50000, 100000, 500000, 1000000, 10000000, 50000000];
    const widths = [16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176];
    const index = ranges.findIndex((r, i) => value > r && value <= ranges[i + 1]);

    let widthValue = 0;

    if (value !== 0) { widthValue = widthValue = widths[index] || widths[widths.length - 1] }


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

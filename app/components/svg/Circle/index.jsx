import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import "../style.scss";

class CircleSVG extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    program: PropTypes.string,
    size: PropTypes.number.isRequired,
    shadow: PropTypes.bool,
    fill: PropTypes.string
  };

  static defaultProps = {
    label: null,
    program: "default",
    fill: '#F9781C'
  }

  render() {
    const { size, fill, label, program, shadow } = this.props;

    return (<svg className={classnames(["circle", program, { shadow: shadow }])} height={size} width={size}>
      <circle fill={fill} cx={size / 2} cy={size / 2} r={size / 2} strokeWidth="1">
        {label && (<title>{label}</title>)}
      </circle>
    </svg>);
  }

}

export default CircleSVG;

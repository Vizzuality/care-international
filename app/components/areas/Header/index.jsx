import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

import imgCare from "images/care.png";
import "./style.scss";

class HeaderArea extends React.Component {

  static propTypes = {
    handleAboutClick: PropTypes.func.isRequired,
  };

  render() {
    // const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? '/care-international' : '';
    const prefix = '';

    return (<div id="header">

      <div className="menu">
        <ul className="menu">
          <li>
            <NavLink to={`${prefix}/2017/reach/countries`} activeClassName="active">Reach 2017</NavLink>
          </li>
          <li>
            <NavLink to={`${prefix}/2016/reach/countries`} activeClassName="active">Reach 2016</NavLink>
          </li>
          <li>
            <NavLink to={`${prefix}/impact`} activeClassName="active">Impact</NavLink>
          </li>
        </ul>
      </div>

      <div className="logo">
        <img alt="care" src={imgCare} onClick={this.props.handleAboutClick} />
      </div>

    </div>);
  }

}

export default HeaderArea;

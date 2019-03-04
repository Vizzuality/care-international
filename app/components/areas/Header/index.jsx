import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

import { NavLink } from "react-router-dom";

import imgCare from "images/care.png";
import "./style.scss";

import { runInContext } from "vm";

class HeaderArea extends React.Component {

  static propTypes = {
    handleAboutClick: PropTypes.func.isRequired,
  };

  render() {

    // const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? '/care-international' : '';
    const prefix = '';
    const pathname= location.pathname;

    return (<div id="header">

      <div className="menu">
        <ul className="menu">
          <li>
            <NavLink to={`${prefix}/reach`} className={ classnames({
              'active': location.href.includes("reach")})}>Reach</NavLink>

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
runInContext

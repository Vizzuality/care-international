import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import Select from "react-select";

import imgCare from "images/care.png";
import "./style.scss";

import { runInContext } from "vm";

class HeaderArea extends React.Component {

  static propTypes = {
    handleAboutClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedYear:
        {
          label: '2018',
          value: '2018'
        }
    }
  }

  handleChange = (e) => {
    this.setState({
      selectedYear:
      {
        label: e.label,
        value: e.value
      }
    });
    location.replace(`/${e.value}/reach/countries` );
  }



  render() {

    // const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? '/care-international' : '';
    const prefix = '';

    return (<div id="header">

      <div className="menu">
        <ul className="menu">
          <li>
            <NavLink to={`${prefix}/reach`} activeClassName="active">Reach</NavLink>
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

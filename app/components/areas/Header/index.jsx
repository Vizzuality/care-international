import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import Select from "react-select";

import imgCare from "images/care.png";
import "./style.scss";

import { years } from "./constants"

class HeaderArea extends React.Component {

  static propTypes = {
    handleAboutClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedYear: '',
    }
  }

  handleChange = (e) => {
    const  selectedYear  = this.state;
    this.setState({ selectedYear: e.value });

    location.replace(`/${e.value}/reach/countries` );
  }



  render() {

    // const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? '/care-international' : '';
    const prefix = '';
    const { selectedYear } = this.state;

    return (<div id="header">

      <div className="menu">
        <ul className="menu">
          <li>
          <div className="select-menu">
            <span className="reacts">Reach</span>
              <Select
                classNamePrefix="react-select"
                options={years}
                value={selectedYear}
                onChange={this.handleChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                  ...theme.colors,
                    primary25: 'rgba(240, 120, 28, 0.1)',
                    primary: 'rgba(240, 120, 28, 0.1)',
                  },
                })}
              />
          </div>
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

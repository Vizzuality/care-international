import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import Select from "react-select";

import imgCare from "images/care.png";
import "./style.scss";

class HeaderArea extends React.Component {

  static propTypes = {
    handleAboutClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      year: '2018'
    }
  }

  handleChange() {
    this.SetState({ year });
    console.log('year')
  }

  render() {
    // const prefix = process.env.GITHUB_PAGES_FOLDER === 'true' || process.env.GITHUB_PAGES_FOLDER === true ? '/care-international' : '';
    const prefix = '';
    const { year } = this.state;
    const yearsOptions = [{ label: "2016", value: "2016" },
    { label: "2017", value: "2017" },
    { label: "2018", value: "2018" }]

    return (<div id="header">

      <div className="menu">
        <ul className="menu">
          <li>
          <div className="select-menu">
            <span className="reacts">Reach</span>
              <Select
                classNamePrefix="react-select"
                options={yearsOptions}
                onChange={this.handleChange}
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

import React from "react";
import PropTypes from "prop-types";
import Select from 'react-select';
import classname from 'classnames';

import programs from "resources/programs.json";
import { years } from './constants';

import "./style.scss";

class AreaSummary extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number,
    program: PropTypes.string.isRequired,
  }

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
    location.replace(`/${e.value}/reach/countries`);
  }

  render() {
    let { title, value, program } = this.props;
    let { selectedYear } = this.state;

    return (<div className="content">
      <div  className={ classname(
          location.href.includes("reach") ? 'reach' : 'impact',
           'c-area-summary')}>

          <span dangerouslySetInnerHTML={{ __html: title }} />
          {program !== "overall" && (<span className="subtitle">
            {programs.find((p) => p.id === program).label}
          </span>)}
          {location.href.includes("reach") &&
            <div className="select-menu">
              <Select
                classNamePrefix="react-select"
                options={years}
                value={selectedYear}
                isSearchable
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
            </div>}
          <span>{(value || "no data").toLocaleString()}</span>
      </div>
    </div>);
  }
};

export default AreaSummary;

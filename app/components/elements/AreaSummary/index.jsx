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

  state = {
    year: '2018'
  }


  handleChange = (e) => {
    const { router } = this.props;
    const selectedYear = e.value;

    this.setState({ year: selectedYear })
    router.history.replace(`/${selectedYear}/reach/countries`);
  }

  render() {
    let { title, value, program } = this.props;
    const { year } = this.state;

    return (<div className="content">
      <div className={classname(
        location.href.includes("reach") ? 'reach' : 'impact',
        'c-area-summary')}>
        <div className="area-summary-wrapper">
          <span dangerouslySetInnerHTML={{ __html: title }} />
          {program !== "overall" && (<span className="subtitle">
            {programs.find((p) => p.id === program).label}
          </span>)}
          {location.href.includes("reach") &&
            <div className="select-menu">
              <Select
                classNamePrefix="react-select"
                options={years}
                value={{label: year, value: year}}
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
        </div>
        <span className="area-summary-data">{(value || "no data").toLocaleString()}</span>
      </div>
    </div>);
  }
};

export default AreaSummary;

import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import classname from "classnames";

import programs from "resources/programs.json";

import "./style.scss";

class AreaSummary extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number,
    program: PropTypes.string.isRequired,
    year: PropTypes.number,
    years: PropTypes.array,
  }

  static defaultProps = {
    year: "",
    years: [],
  }

  handleChange = (e) => {
    const { router, country } = this.props;
    const selectedYear = e.value;
    this.setState({ year: selectedYear });
    country ?
      router.history.replace(`/reach/countries/${selectedYear}?/${country}`)
      : router.history.replace(`/reach/countries/${selectedYear}?`);
  }

  render() {
    let { title, value, program, years, year } = this.props;

    return (<div className="content">
      <div className={classname({
        "c-area-summary": true,
        "impact": location.href.includes("impact"),
        "reach": location.href.includes("reach"),
      })}>
        <div className={classname({
          "area-summary-wrapper": true,
          "impact": location.href.includes("impact"),
          "reach": location.href.includes("reach"),
        })}>
          <span dangerouslySetInnerHTML={{ __html: title }} />
          {location.href.includes("reach") &&
            <div className="select-menu">
              <Select
                classNamePrefix="react-select"
                options={years}
                value={{ label: year, value: year }}
                isSearchable
                onChange={this.handleChange}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "rgba(240, 120, 28, 0.1)",
                    primary: "rgba(240, 120, 28, 0.9)",
                  },
                })}
              />
            </div>}
        </div>
        {program !== "overall" && (<span className="subtitle">
          {programs.find((p) => p.id === program).label}
        </span>)}
        <span className="area-summary-data">{(value || "no data").toLocaleString()}</span>
      </div>
    </div>);
  }
};

export default AreaSummary;

import React from "react";
import PropTypes from "prop-types";

import AreaSummary from "components/elements/AreaSummary";
import RadioButton from "components/elements/Radio";
import BarWrapper from "components/wrappers/Bar";
import PercentageBar from "components/elements/PercentageBar";
import ValueBar from "components/elements/ValueBar";

import { logEvent } from "utils/analytics";

import programs from "resources/programs.json";
import imgHelp from "images/help.svg";

import "./style.scss";

class ReachSidebarArea extends React.Component {

  static propTypes = {
    program: PropTypes.string,
    country: PropTypes.string,
    statistics: PropTypes.object.isRequired,
    handleProgramChange: PropTypes.func.isRequired,
    handleAboutDirectReachClick: PropTypes.func.isRequired,
    handleAboutIndirectReachClick: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
  }

  static defaultProps = {
    program: "overall",
  };

  componentWillUpdate(){
    const { country, program } = this.props;
    if (country && program ) {
      logEvent('detailed data', country, program);
    }
  }

  render() {
    let {
      program,
      country,
      statistics,
      handleProgramChange,
      year,
      years,
      router,
    } = this.props;

    const reachPrograms = programs
      .filter(program => program.tabs.includes("reach"));

    const maxValue = Math.max.apply(null, reachPrograms.map((p) => {
      let directValue = statistics[`${p.id}_direct_participants`];
      let indirectValue = statistics[`${p.id}_indirect_participants`];
      //let maxValue = directValue + indirectValue;
      return maxValue;
    }));

    return (<div className="sidebar-content-reach">
    {program !== 'other' &&
          <AreaSummary
          title="Projects and Initiatives in"
          value={statistics[`${program}_projects_and_initiatives`]}
          program={program}
          router={router}
          country={country}
          years={years}
          year={year}
        />
    }

      {!(country && program !== "overall") && statistics[`has_${program}_data`] && (<div className="content">
        <dl>
          <dt>
            Participants reached in {year}
          </dt>
          <dd>
            <ul>
              <li>
                <div className="clickable" onClick={this.props.handleAboutDirectReachClick}>
                  Direct <img src={imgHelp} alt="Help" />
                </div>
                <BarWrapper bar={PercentageBar}
                  colorClass={program}
                  value={statistics[`${program}_direct_participants_women`]}
                  maxValue={statistics[`${program}_direct_participants`]} />
              </li>
              <li>
                <div className="clickable" onClick={this.props.handleAboutIndirectReachClick}>
                  Indirect <img src={imgHelp} alt="Help" />
                </div>
                <BarWrapper bar={PercentageBar}
                  colorClass={program}
                  value={statistics[`${program}_indirect_participants_women`]}
                  maxValue={statistics[`${program}_indirect_participants`]} />
              </li>
            </ul>
          </dd>
        </dl>
      </div>)}

      {(country && program !== "overall") && statistics[`has_${program}_data`] && (<div className="content">
        <dl>
          <dt>
            Participants reached in {year}
          </dt>
          <dd>
            <ul>
              <li>
                <ul className="legend">
                  <li className={program}>{program}</li>
                  <li className="overall">Total</li>
                </ul>
              </li>
              <li>
                <div className="clickable" onClick={this.props.handleAboutDirectReachClick}>
                  Direct <img src={imgHelp} alt="Help" />
                </div>
                <BarWrapper bar={ValueBar}
                  colorClass={program}
                  value={statistics[`${program}_direct_participants`]}
                  maxValue={statistics["overall_direct_participants"]}
                  formatter={(v) => v.toLocaleString()} />
                <BarWrapper bar={ValueBar}
                  colorClass="overall"
                  value={statistics["overall_direct_participants"]}
                  maxValue={statistics["overall_direct_participants"]}
                  formatter={(v) => v.toLocaleString()} />
              </li>
              <li>
                <div className="clickable" onClick={this.props.handleAboutIndirectReachClick}>
                  Indirect <img src={imgHelp} alt="Help" />
                </div>
                <BarWrapper bar={ValueBar}
                  colorClass={program}
                  value={statistics[`${program}_indirect_participants`]}
                  maxValue={statistics["overall_indirect_participants"]}
                  formatter={(v) => v.toLocaleString()} />
                <BarWrapper bar={ValueBar}
                  colorClass="overall"
                  value={statistics["overall_indirect_participants"]}
                  maxValue={statistics["overall_indirect_participants"]}
                  formatter={(v) => v.toLocaleString()} />
              </li>
            </ul>
          </dd>
        </dl>
      </div>)}

      {(statistics[`has_${program}_data`] === false) && (<div className="content">
        <p>{statistics.comment}</p>
      </div>)}

      <div className="filters">
        <dl>
          <dt>
            Participants reached by program area
          </dt>
          <dd>
            <ul>
              {reachPrograms.map((p, n) => {
                let directValue = Math.round(statistics[`${p.id}_direct_participants`]);
                let indirectValue = Math.round(statistics[`${p.id}_indirect_participants`]);
                let maxValue = directValue + indirectValue;
                return (<li key={n} className={p.id}>
                  <RadioButton
                    id={`radio-${n}`}
                    name="program-filter"
                    checked={program === p.id}
                    onChange={() => handleProgramChange(p.id)}>
                    {p.label}
                  </RadioButton>
                  {statistics[`has_${p.id}_data`] && (<ul>
                    <li>
                      <BarWrapper bar={ValueBar}
                        value={directValue}
                        maxValue={maxValue}
                        colorClass={p.id}
                        formatter={(v) => `${v.toLocaleString()} direct`}
                      />
                    </li>
                    <li>
                      <BarWrapper bar={ValueBar}
                        value={indirectValue}
                        maxValue={maxValue}
                        colorClass={p.id}
                        formatter={(v) => `${v.toLocaleString()} indirect`}
                      />
                    </li>
                  </ul>)}
                </li>);
              })}
            </ul>
          </dd>
        </dl>
      </div>

    </div>);
  }

}


export default ReachSidebarArea;

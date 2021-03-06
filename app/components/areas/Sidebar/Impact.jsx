import React from "react";
import PropTypes from "prop-types";

import AppLink from "components/elements/AppLink";
import AreaSummary from "components/elements/AreaSummary";
import RadioButton from "components/elements/Radio";
import BarWrapper from "components/wrappers/Bar";
import ValueBar from "components/elements/ValueBar";
import CircleSVG from "components/svg/Circle";

import { getStoriesFiltered } from "lib/remote";

import programs from "resources/programs.json";

class ImpactSidebarArea extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    program: PropTypes.string,
    statistics: PropTypes.object.isRequired,
    stories: PropTypes.array,
    handleProgramChange: PropTypes.func.isRequired,
    years: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
  }

  static defaultProps = {
    program: "overall",
  };

  render() {
    let {
      stories,
      program,
      statistics,
      handleProgramChange,
      region,
      country,
      years,
      year,
    } = this.props;

    const storiesFiltered = getStoriesFiltered(stories, program, country, region);

    return (<div className="sidebar-content-impact">

      <AreaSummary
        title={`Total Population impacted<br /> by end of ${year}`}
        value={statistics[`${program}_impact`]}
        program={program}
        years={years}
        year={year}
      />

      <div className="filters">
        <dl>
          <dt>
            Population impacted by program area
          </dt>
          <dd>
            <ul>
              {programs.map((p, n) => {

                let value = statistics[`${p.id}_impact`];
                let maxValue = statistics["overall_impact"];

                return (<li key={`sidebar-impact-item-${p.id}`} className={p.id}>
                  <RadioButton
                    id={`radio-${n}`}
                    name="program-filter"
                    checked={program === p.id}
                    onChange={() => handleProgramChange(p.id)}
                    onClick={(e) => program === p.id && handleProgramChange('overall')}>
                    {p.label}
                  </RadioButton>
                  <ul>
                    <li>
                      <BarWrapper bar={ValueBar}
                        value={value}
                        maxValue={maxValue}
                        formatter={(v) => v.toLocaleString()}
                        colorClass={p.id} />
                    </li>
                  </ul>
                </li>);
              })}
            </ul>
          </dd>
        </dl>
      </div>

      <div className="stories">
        <dl>
          <dt>
            All impacts
            <hr />
          </dt>
          <dd>
            <ul>
              {storiesFiltered.map((story, n) => {
                return (<li key={story.story_number + n}>
                  <ul className="story">
                    <li className="title">
                      <AppLink mainView="impact" story={story.story_number}>
                        {story.story}
                      </AppLink>
                    </li>
                    <li>
                      <ul className="outcomes">
                        {story.outcomes.map((outcome) => (<li key={outcome}>
                          <CircleSVG size={15} program={outcome} />
                          {outcome}
                        </li>))}
                      </ul>
                    </li>
                    <li>
                      <ul className="locations">
                        {story.countries.map((country) => (<li key={country}>
                          {country}
                        </li>))}
                      </ul>
                    </li>
                  </ul>
                </li>);
              })}
            </ul>
          </dd>
        </dl>
      </div>

    </div>);
  }

}


export default ImpactSidebarArea;
